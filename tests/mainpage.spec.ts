import { test, expect } from '@playwright/test';
import { MainPage } from './../pages/mainpage';

// test.beforeEach(async ({ page }, testInfo) => {
//   const mpage = new MainPage(page);
//   await mpage.open();
// });

test('Main page have required components', async ({ page }) => {
  
  const mpage = new MainPage(page);    
  await mpage.open();
  await expect(mpage.openReportUpdateButton).toBeVisible();
  await expect(mpage.openReportUpdateButton).toBeVisible();
  await expect(mpage.reportUpdatePanelHeader).toBeHidden();
  await expect(mpage.contentReportArea).toContainText('Content...');
    
});

test('Open Report Update Panel works properly', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  // check that Panel items are displayed  
  await expect(mpage.reportUpdatePanelHeader).toBeVisible();
  await expect(mpage.reportItemsList).toBeVisible();
  await expect(mpage.fullReportUpdateButton).toBeVisible();  
  await expect(mpage.closeReportUpdateButton).toBeVisible();

});
// to finish
test.skip('Open & Close Report Update Panel can be closed', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  // check that Panel items are displayed  
  await expect(mpage.reportUpdatePanelHeader).toBeVisible();
  await expect(mpage.reportItemsList).toBeVisible();
  await expect(mpage.fullReportUpdateButton).toBeVisible();  
  await expect(mpage.closeReportUpdateButton).toBeVisible();
  await mpage.closeUpdatePanel();
  // check that Panel items are NOT displayed  
  await expect(mpage.reportUpdatePanelHeader).toBeHidden();
  await expect(mpage.reportItemsList).toBeHidden();
  await expect(mpage.fullReportUpdateButton).toBeHidden();  
  await expect(mpage.closeReportUpdateButton).toBeHidden();
});

// to finish
test.skip('Add item to report', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  await mpage.addItemToReport("Ford Cortina");
  // await expect(mpage.isItemInReport("Ford Cortina")).toEqual(true); 

});

test.skip('Add multiply items to report', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  await mpage.addItemToReport("Ford Cortina");
  await mpage.addItemToReport("Ferrari 812 Superfast");
  await mpage.addItemToReport("Seat Tarraco");  

});

// to finish
test('Generate full update report', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  await mpage.addItemToReport("Ford Cortina");
  await mpage.addItemToReport("Ferrari 812 Superfast");
  await mpage.addItemToReport("Seat Tarraco");
  await mpage.generateReport();

  await expect(mpage.createReportNotification).toContainText('FINISHED');
  await mpage.isItemInReport("Ford Cortina");
  await mpage.isItemInReport("Ferrari 812 Superfast");
  await mpage.isItemInReport("Seat Tarraco");  
  
});