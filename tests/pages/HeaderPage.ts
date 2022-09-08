import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class HeaderPage {

  readonly page: Page;
  // initial items present on a page
  readonly openReportUpdateButton: Locator
  // items related to 'Report Update Panel'
  readonly spinner: Locator
  // content area
  readonly createReportNotification: Locator  
  readonly closeReportNotificationButton: Locator  
  
  constructor(page: Page) {
    this.page = page
    this.openReportUpdateButton = page.locator('.update-report-panel-button')
    this.spinner = page.locator('div.spinner-border')        
    // content area
    this.createReportNotification = page.locator('div.result-alert') 
    this.closeReportNotificationButton = page.locator('.alert .close') 
  }

  async invokeUpdatePanel() {
    await Promise.all([
      await this.openReportUpdateButton.click(),
      await this.spinner.isHidden()
    ]);
  };

  async closeReportNotification() {
    await this.closeReportNotificationButton.click();    
  };

}