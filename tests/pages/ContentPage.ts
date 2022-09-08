import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ContentPage {

  readonly page: Page;

  // content area
  readonly contentReportItems: Locator
  readonly createReportNotification: Locator  

  constructor(page: Page) {
    this.page = page
    // content area
    this.contentReportItems = page.locator('//p[contains(text(),\'Inserted\')]')
    this.createReportNotification = page.locator('div.result-alert')
  }

  async isItemInReport(name: string) {
    const reportItems = await this.page.$$("//p[contains(text(),'[CONTENT]')]");
    const innerTexts = await Promise.all(reportItems.map(async (item, i) => {
      return await item.innerText();
    }));

    var res = innerTexts.map(e => e.split(" ", 3)[1].toUpperCase())
    expect(res.includes(name.toUpperCase().replace(/ /g, '_'))).toBe(true);
  }

}
