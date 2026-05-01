import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  audioEngineeringHeading() {
    return this.heading('Audio Engineering');
  }

  softwareEngineeringHeading() {
    return this.heading('Software Engineering');
  }

  electronicsEngineeringHeading() {
    return this.heading('Electronics Engineering');
  }
}