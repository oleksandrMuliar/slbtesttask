import type { Locator, Page } from '@playwright/test';

export class UpdatePanelPage {

  readonly page: Page;

  // items related to 'Report Update Panel'
  readonly closeReportUpdateButton: Locator  
  readonly fullReportUpdateButton: Locator    
  readonly reportItemNames: Locator  
  readonly reportItemAddButtons: Locator  
  readonly reportItemsList: Locator  
  readonly addItemButton: Locator
  readonly reportUpdatePanelHeader: Locator
  readonly spinner: Locator
  // content area
  readonly contentReportItems: Locator  
  readonly createReportNotification: Locator  
  readonly closeReportNotificationButton: Locator  
  
  constructor(page: Page) {
    this.page = page
    this.closeReportUpdateButton = page.locator('.report-update-panel__close-button')
    this.fullReportUpdateButton = page.locator('.report-update-panel__footer .full-update-report-button')
    this.addItemButton = page.locator('.insert-report-content-item-button')        
    this.reportItemsList = page.locator('.report-content-item-list')        
    this.reportItemNames = page.locator('div.report-content-item__name')        
    this.reportItemAddButtons = page.locator('div.report-content-item__action')        
    this.reportUpdatePanelHeader = page.locator('div.report-update-panel__header')        
    this.spinner = page.locator('div.spinner-border')        
    // content area
    this.contentReportItems = page.locator('//p[contains(text(),\'Inserted\')]')  
    this.createReportNotification = page.locator('div.result-alert') 
    this.closeReportNotificationButton = page.locator('.alert .close') 
  }

  async closeUpdatePanel() {
    await Promise.all([
      await this.closeReportUpdateButton.click(),
      await this.closeReportUpdateButton.isHidden()
    ]);
  };

  async generateReport() {
    await Promise.all([
      await this.fullReportUpdateButton.click(),
      await this.createReportNotification.isEnabled(),
      await this.spinner.isHidden(),
      await this.fullReportUpdateButton.isEnabled()      
    ]);
  };

  async closeReportNotification() {
    await this.closeReportNotificationButton.click();    
  };

  async addItemToReport(name: string) {
    await Promise.all([
      await this.reportItemsList.isEnabled()      
    ]);    
    const count = await this.reportItemNames.count()
    for (let i = 0; i < count; ++i) {
      if (await this.reportItemNames.nth(i).textContent() == name) {
        await this.reportItemAddButtons.nth(i).click();
      }
    }
  };

}
