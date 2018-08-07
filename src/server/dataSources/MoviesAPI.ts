import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

export class MoviesAPI extends RESTDataSource {
  apiKey = "bc96567e2f93790dea0e0c481845bc1b";
  baseURL = "https://api.themoviedb.org/3/";

  willSendRequest(request: RequestOptions) {
    request.params.set("api_key", this.apiKey);
  }

  async getMovie(id: string) {
    return this.get(`movie/${id}`);
  }

  async getCast(id: string) {
    return this.get(`movie/${id}/credits`);
  }
}
