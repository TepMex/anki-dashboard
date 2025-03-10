import moment from "moment";
import AnkiConnect from "./AnkiConnect";
import { cardsByFirstReview, getDatesFromTo } from "../utils";

class DashboardService {
  constructor() {
    this.ankiConnector = new AnkiConnect();
  }

  async loadDashboardData() {
    try {
      const [reviewsStats, deckData, intervals] = await Promise.all([
        this.getReviewStats(),
        this.getDeckData(),
        this.getIntervalData(),
      ]);

      const { plotData, mistakesData } = this.generatePlotData(
        deckData.cardReviewsArray
      );

      return {
        intervals: intervals.filter((interval) => interval >= 7).length,
        reviewsStats,
        togglCalendarData: null,
        plotData,
        mistakesData,
      };
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      throw error;
    }
  }

  async getReviewStats() {
    return await this.ankiConnector.getNumCardsReviewedByDay();
  }

  async getDeckData() {
    const deckNamesAndIds = await this.ankiConnector.getDeckNamesAndIds();
    const cardsArray = await this.ankiConnector.getCardsForDeck(
      "Refold Mandarin 1k Simplified"
    );
    const cardReviewsArray = await this.ankiConnector.getAllReviewsForCards(
      cardsArray
    );

    return { deckNamesAndIds, cardsArray, cardReviewsArray };
  }

  async getIntervalData() {
    const cardsArray = await this.ankiConnector.getCardsForDeck(
      "Refold Mandarin 1k Simplified"
    );
    return await this.ankiConnector.getIntervals(cardsArray);
  }

  generatePlotData(cardReviewsArray) {
    const cardsInQueue = cardsByFirstReview(cardReviewsArray);
    const mistakesByDate = this.getMistakesByDate(cardReviewsArray);
    const timeTable = getDatesFromTo(moment().add(-2, "year"), moment());

    const plotData = timeTable.map((t) => [
      t.format("YYYY-MM-DD"),
      cardsInQueue(t),
    ]);
    const mistakesData = timeTable.map((t) => [
      t.format("YYYY-MM-DD"),
      mistakesByDate.get(t.format("YYYY-MM-DD")) || 0,
    ]);

    return { plotData, mistakesData };
  }

  getMistakesByDate(cardReviewsArray) {
    const mistakesByDate = new Map();

    // Process each card's reviews
    Object.values(cardReviewsArray).forEach((reviews) => {
      reviews.forEach((review) => {
        // A review is considered a mistake if:
        // 1. ease = 1 (Again button pressed) or
        // 2. new interval is less than previous interval
        const isMistake =
          review.ease === 1 ||
          (review.ivl < review.lastIvl && review.lastIvl > 0);

        if (isMistake) {
          const date = moment(review.id).format("YYYY-MM-DD");
          mistakesByDate.set(date, (mistakesByDate.get(date) || 0) + 1);
        }
      });
    });

    return mistakesByDate;
  }
}

const dashboardService = new DashboardService();
export default dashboardService;
