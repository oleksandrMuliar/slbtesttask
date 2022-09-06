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
  readonly createReportNotification: Locator  
  
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
    
    this.createReportNotification = page.locator('[class*="result-alert"]') 
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
    await expect(this.reportItemsList).toBeVisible(false);  
    await this.page.waitForSelector('[class="spinner-border"]', {
      state: 'detached',
      timeout: 7000
    });
    await expect(this.fullReportUpdateButton).toBeVisible();
  };

  async addItemToReport(name: string) {
    const itemNnames = this.page.locator('[class*="report-content-item__name"]');
    const itemAddButtons = this.page.locator('[class*="report-content-item__action"]');
    
    const count = await itemNnames.count()
    for (let i = 0; i < count; ++i)
    {
      if(await itemNnames.nth(i).textContent() == name)
      {
        await itemAddButtons.nth(i).click();
      }
    }
  };

  async isItemInReport(name: string): Promise<boolean> {
    
    const reportItems = await this.page.$$("//p[contains(text(),\'Inserted\')]");
    const innerTexts = await Promise.all(reportItems.map(async (item, i) => {
      return await item.innerText();
    }));
    console.log("innerTexts = " + innerTexts);
    // innerTexts.find(e => e.split(" ", 3)[1].toUpperCase() == name.toUpperCase().replace(" ", "_")))
    //   return true;
    // else
      return false; 

    // var result = false;

    // innerTexts.forEach((item => {
    //   var splitted = item.split(" ", 3)[1].toUpperCase();
    //   // console.log(item);
    //   // console.log(splitted);
    //   if(splitted == name)
    //   result =  true;      
    // }));
    
    // return result;
  }

}