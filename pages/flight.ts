import { Page, Locator } from '@playwright/test';

export class Flight {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
