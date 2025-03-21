import AnkiConnect from "./AnkiConnect";
import TogglTrackConnector from "./TogglTrackConnector";
import moment from "moment";
import { cardsByFirstReview } from "../utils";

class DashboardService {
  constructor() {
    this.anki = new AnkiConnect();
    this.toggl = new TogglTrackConnector();
  }

  static async loadDashboardData(selectedDecks = [], startDate, endDate) {
    const service = new DashboardService();

    // Get all deck names and IDs if no decks are selected
    const deckNamesAndIds = await service.anki.getDeckNamesAndIds();

    if (selectedDecks.length === 0) {
      return { deckNamesAndIds };
    }

    // Get cards for selected decks
    const cardsPromises = selectedDecks.map((deckName) =>
      service.anki.getCardsForDeck(deckName)
    );
    const cardsArrays = await Promise.all(cardsPromises);
    const cards = cardsArrays.flat();

    // Get total number of cards
    const totalCards = cards.length;

    // Get intervals for cards
    const intervals = await service.anki.getIntervals(cards);

    // Get reviews stats
    const reviewsStats = await service.anki.getNumCardsReviewedByDay();

    // Get all reviews for cards to calculate mistakes
    const cardReviews = await service.anki.getAllReviewsForCards(cards);

    // Process reviews to get mistakes data
    const mistakesMap = new Map();

    // First collect all mistakes
    for (const entry of Object.entries(cardReviews)) {
      for (const review of entry[1]) {
        const date = moment(review.id).format("YYYY-MM-DD");
        if (review.ease === 1) {
          // ease of 1 indicates a mistake
          mistakesMap.set(date, (mistakesMap.get(date) || 0) + 1);
        }
      }
    }

    // Calculate plot data and mistakes data together to ensure alignment
    const getWordsLearned = cardsByFirstReview(cardReviews);
    const plotData = [];
    const mistakesData = [];

    const rangeStartDate = moment(startDate); //.subtract(1, "year");
    const rangeEndDate = moment(endDate);
    let currentDate = rangeStartDate;

    // Process reviewsStats into a map for easier lookup
    const reviewsMap = new Map(
      reviewsStats.map(([date, count]) => [
        moment(date).format("YYYY-MM-DD"),
        count,
      ])
    );

    while (currentDate.isSameOrBefore(rangeEndDate)) {
      const dateStr = currentDate.format("YYYY-MM-DD");
      plotData.push([dateStr, getWordsLearned(currentDate)]);
      mistakesData.push([dateStr, mistakesMap.get(dateStr) || 0]);
      currentDate.add(1, "day");
    }

    // Create reviewsData array with the same dates as plotData
    const reviewsData = plotData.map(([date]) => [
      date,
      reviewsMap.get(date) || 0,
    ]);

    return {
      intervals,
      reviewsStats,
      plotData,
      mistakesData,
      reviewsData,
      deckNamesAndIds,
      totalCards,
    };
  }
}

export default DashboardService;
