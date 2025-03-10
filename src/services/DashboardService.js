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

      const plotData = this.generatePlotData(deckData.cardReviewsArray);

      return {
        intervals: intervals.filter((interval) => interval >= 7).length,
        reviewsStats,
        togglCalendarData: null,
        plotData,
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
    const timeTable = getDatesFromTo(moment().add(-2, "year"), moment());

    return timeTable.map((t) => [t.format("YYYY-MM-DD"), cardsInQueue(t)]);
  }
}

const dashboardService = new DashboardService();
export default dashboardService;
