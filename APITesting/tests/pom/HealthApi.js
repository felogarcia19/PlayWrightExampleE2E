import { BaseApi } from './BaseApi.js';

export class HealthApi extends BaseApi {
  endpoint = '/health';

  async fetch() {
    return this.get(this.endpoint);
  }
}
