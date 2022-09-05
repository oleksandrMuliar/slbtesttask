import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
export class MainPage {

  readonly page: Page;

  readonly openReportUpdateButton: Locator
  readonly closeReportUpdateButton: Locator  
  readonly fullReportUpdateButton: Locator  
  readonly contentReportArea: Locator
  readonly reportItemsList: Locator  
  readonly addItemButton: Locator
  readonly reportUpdatePanelHeader: Locator
  readonly spinner: Locator

  constructor(page: Page) {
    this.page = page
    this.openReportUpdateButton = page.locator('button[class*="update-report-panel-button"]')
    this.closeReportUpdateButton = page.locator('[class*="report-update-panel__close-button"]')
    this.fullReportUpdateButton = page.locator('button[class*="full-update-report-button"]')
    this.contentReportArea = page.locator('[class="report"]')
    this.addItemButton = page.locator('[class*="insert-report-content-item-button"]')        
    this.reportItemsList = page.locator('[class*="report-content-item-list"]')        
    this.reportUpdatePanelHeader = page.locator('[class="report-update-panel__header"]')        
    this.spinner = page.locator('[class="spinner-border"]')        
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
  
}