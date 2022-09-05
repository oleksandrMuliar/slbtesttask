import { test, expect } from '@playwright/test';
import { MainPage } from './../pages/mainpage';

test.skip('Main page have required components', async ({ page }) => {
  
  const mpage = new MainPage(page);    
  await mpage.open();
  // await page.waitForFunction(() => document.title === 'QA Test');
  await expect(mpage.openReportUpdateButton).toBeVisible();
  await expect(mpage.openReportUpdateButton).toBeVisible();
  await expect(mpage.reportUpdatePanelHeader).toBeHidden();
  await expect(mpage.contentReportArea).toContainText('Content...');
    
});

test.skip('Open Report Update Panel works properly', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.openReportUpdateButton.click();
  await mpage.invokeUpdatePanel();
  // check that Panel items are displayed  
  await expect(mpage.reportUpdatePanelHeader).toBeVisible();
  await expect(mpage.reportItemsList).toBeVisible();
  await expect(mpage.fullReportUpdateButton).toBeVisible();  
  await expect(mpage.closeReportUpdateButton).toBeVisible();

});

test('Add item to report', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  await mpage.addItemToReport("Ford Cortina");
  await mpage.isItemInReport("Ford Cortina");
  // tmp to remove
  await expect(mpage.reportUpdatePanelHeader).toBeHidden();
  

});