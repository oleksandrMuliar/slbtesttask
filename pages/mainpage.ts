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
  readonly contentReportItems: Locator  
  
  constructor(page: Page) {
    this.page = page
    this.openReportUpdateButton = page.locator('button[class*="update-report-panel-button"]')
    this.closeReportUpdateButton = page.locator('[class*="report-update-panel__close-button"]')
    this.fullReportUpdateButton = page.locator('button[class*="full-update-report-button"]')
    this.contentReportArea = page.locator('[class="report"]')
    this.addItemButton = page.locator('[class*="insert-report-content-item-button"]')        
    this.reportItemsList = page.locator('[class*="report-content-item-list"]')        
    this.reportItemNames = page.locator('[class*="report-content-item__name"]')        
    this.reportItemAddButtons = page.locator('[class*="report-content-item__name"]')        
    this.reportUpdatePanelHeader = page.locator('[class="report-update-panel__header"]')        
    this.spinner = page.locator('[class="spinner-border"]')        

    // content
    this.contentReportItems = page.locator('//p[contains(text(),\'Inserted\')]')        
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

  async addItemToReport(name: string) {
    const itemNnames = this.page.locator('[class*="report-content-item__name"]');
    const itemAddButtons = this.page.locator('[class*="report-content-item__action"]');
    
    const count = await itemNnames.count()
    for (let i = 0; i < count; ++i)
    {
      if(await itemNnames.nth(i).textContent() == name)
      {
        console.log("Adding to report: item name = " + await itemNnames.nth(i).textContent());
        await itemAddButtons.nth(i).click();
      }
    }
  };

  async isItemInReport(name): Promise<boolean> {
    // await this.contentReportItems.allTextContents();
    return await this.page.isVisible('a[routerlink="/editor"]');
    // 
}
  
}