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
    this.openReportUpdateButton = page.locator('button[class*="update-report-panel-button"]')
    this.closeReportUpdateButton = page.locator('[class*="report-update-panel__close-button"]')
    this.fullReportUpdateButton = page.locator('button[class*="full-update-report-button"]')
    this.contentReportArea = page.locator('[class="report"]')
    this.addItemButton = page.locator('[class*="insert-report-content-item-button"]')        
    this.reportItemsList = page.locator('[class*="report-content-item-list"]')        
    this.reportItemNames = page.locator('[class*="report-content-item__name"]')        
    this.reportItemAddButtons = page.locator('[class*="report-content-item__action"]')        
    this.reportUpdatePanelHeader = page.locator('[class="report-update-panel__header"]')        
    this.spinner = page.locator('[class="spinner-border"]')        
    // content area
    this.contentReportItems = page.locator('//p[contains(text(),\'Inserted\')]')  
    this.createReportNotification = page.locator('[class*="result-alert"]') 
    this.closeReportNotificationButton = page.locator('[class*="alert"] > [class="close"]') 
  }

  async open() {
      await this.page.goto('https://mr-fedorof.github.io/qa-test/');
  }

  async invokeUpdatePanel() {
    await this.openReportUpdateButton.click()
    await this.page.waitForSelector('[class="spinner-border"]', {
      state: 'detached',
      timeout: 7000
    });
    await expect(this.spinner).toBeHidden();    
  };

  async closeUpdatePanel() {
    await this.closeReportUpdateButton.click();
    await this.page.waitForSelector('[class*="report-update-panel__close-button"]', {
      state: 'detached',
      timeout: 1000
    });
    await expect(this.closeReportUpdateButton).toBeHidden();    
  };

  async generateReport() {
    await this.fullReportUpdateButton.click();
    await expect(this.fullReportUpdateButton).toBeDisabled();
    await this.page.waitForSelector('[class="spinner-border"]', {
      state: 'detached',
      timeout: 7000
    });
    await expect(this.fullReportUpdateButton).toBeEnabled();
  };

  async closeReportNotification() {
    await this.closeReportNotificationButton.click();    
  };

  async addItemToReport(name: string) {
    const count = await this.reportItemNames.count()
    for (let i = 0; i < count; ++i)
    {
      if(await this.reportItemNames.nth(i).textContent() == name)
      {
        await this.reportItemAddButtons.nth(i).click();
      }
    }
  };

  async isItemInReport(name: string){
    
    const reportItems = await this.page.$$("//p[contains(text(),'[CONTENT]')]");
    const innerTexts = await Promise.all(reportItems.map(async (item, i) => {
      return await item.innerText();
    }));
    
    var res = innerTexts.map(e => e.split(" ", 3)[1].toUpperCase())
    // console.log("res = " + res);
    // console.log("name = " + name.toUpperCase().replace(/ /g, '_'));
    expect(res.includes(name.toUpperCase().replace(/ /g, '_'))).toBe(true);
  }

}