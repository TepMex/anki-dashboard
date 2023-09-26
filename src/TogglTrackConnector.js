class TogglTrackConnector {
  constructor(host = "https://api.track.toggl.com") {
    this.host = host;
  }
  async togglRequest(apiUri, method, body) {
    let request = await fetch(this.host + apiUri, {
      method,
      headers: {
        Authorization: `Basic ${btoa(
          "84f4e604a7336a8d32762e23541b6392:api_token"
        )}`,
      },
      body: JSON.stringify(body),
    });
    return request;
  }
  async getCSVReport(startDate, endDate) {
    let requestBody = {
      start_date: startDate,
      end_date: endDate,
    };
    let request = await this.togglRequest(
      "/reports/api/v3/workspace/4737797/search/time_entries.csv",
      "POST",
      requestBody
    );

    return await request.text();
  }
}

export default TogglTrackConnector;
