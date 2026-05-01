export class BaseApi {
  constructor(agent) {
    this.agent = agent;
  }

  get(path) {
    return this.agent.get(path);
  }
}
