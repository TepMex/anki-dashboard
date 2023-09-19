class AnkiConnect {
  constructor(version = 6, host = "http://localhost:8765") {
    this.version = version;
    this.host = host;
  }

  async ankiRequest(body) {
    let request = await fetch(this.host, {
      method: "POST",
      headers: { "Content-Type": "applicaiton/json" },
      body: JSON.stringify({ ...body, version: this.version }),
    });
    let { result } = await request.json();
    return result;
  }

  async getDeckNamesAndIds() {
    return await this.ankiRequest({
      action: "deckNamesAndIds",
    });
  }

  async getCardsForDeck(deckName = "current") {
    return await this.ankiRequest({
      action: "findCards",
      params: {
        query: `"deck:${deckName}"`,
      },
    });
  }

  async getIntervals(cards) {
    return await this.ankiRequest({
      action: "getIntervals",
      params: {
        cards,
      },
    });
  }

  async getNumCardsReviewedByDay() {
    return await this.ankiRequest({
      action: "getNumCardsReviewedByDay",
    });
  }
}

export default AnkiConnect;
