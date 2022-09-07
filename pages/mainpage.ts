import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class MainPage {

  readonly page: Page;
  // initial items present on a page
  readonly openReportUpdateButton: Locator
  readonly contentReportArea: Locator
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
    this.openReportUpdateButton = page.locator('.update-report-panel-button')
    this.closeReportUpdateButton = page.locator('.report-update-panel__close-button')
    this.fullReportUpdateButton = page.locator('.report-update-panel__footer .full-update-report-button')
    this.contentReportArea = page.locator('.content .report')
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

  async open() {
      await this.page.goto('/qa-test/');
  }

  async invokeUpdatePanel() {
    await this.openReportUpdateButton.click()
    await expect(this.spinner).toBeHidden({timeout: 7000});    
  };

  async closeUpdatePanel() {
    await this.closeReportUpdateButton.click();
    await expect(this.closeReportUpdateButton).toBeHidden({timeout: 1000});    
  };

  async generateReport() {
    await this.fullReportUpdateButton.click();
    await expect(this.fullReportUpdateButton).toBeDisabled();
    await expect(this.spinner).toBeHidden({timeout: 7000}); 
    await expect(this.fullReportUpdateButton).toBeEnabled();
  };

  async closeReportNotification() {
    await this.closeReportNotificationButton.click();    
  };

  async addItemToReport(name: string) {
    const count = await this.reportItemNames.count()
    for (let i = 0; i < count; ++i) {
      if (await this.reportItemNames.nth(i).textContent() == name) {
        await this.reportItemAddButtons.nth(i).click();
      }
    }
  };

  async isItemInReport(name: string) {
    const reportItems = await this.page.$$("//p[contains(text(),'[CONTENT]')]");
    const innerTexts = await Promise.all(reportItems.map(async (item, i) => {
      return await item.innerText();
    }));

    var res = innerTexts.map(e => e.split(" ", 3)[1].toUpperCase())
    expect(res.includes(name.toUpperCase().replace(/ /g, '_'))).toBe(true);
  }

}