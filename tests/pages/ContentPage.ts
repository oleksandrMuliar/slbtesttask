import type { Locator, Page } from '@playwright/test';

export class ContentPage {

  readonly page: Page;

  // content area
  readonly contentReportItems: Locator
  readonly createReportNotification: Locator
  readonly fullText: Locator

  constructor(page: Page) {
    this.page = page
    // content area
    this.contentReportItems = page.locator('//p[contains(text(),\'Inserted\')]')
    this.createReportNotification = page.locator('div.result-alert')
    this.fullText = page.locator('.content .report')
  }

  formatItemName(itemName: string) {

    return itemName.toUpperCase().replace(/ /g, '_').trim();

  }

}
