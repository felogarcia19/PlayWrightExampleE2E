import { BaseApi } from './BaseApi.js';

export class SiteSummaryApi extends BaseApi {
  endpoint = '/api/site/summary';

  async fetch() {
    return this.get(this.endpoint);
  }
}
