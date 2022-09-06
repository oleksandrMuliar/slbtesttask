import { test, expect } from '@playwright/test';
import { MainPage } from './../pages/mainpage';

test('Main page have required components', async ({ page }) => {
  
  const mpage = new MainPage(page);    
  await mpage.open();
  expect(await page.title()).toEqual("QA Test");
  await expect(mpage.openReportUpdateButton).toBeVisible();
  await expect(mpage.openReportUpdateButton).toBeVisible();
  await expect(mpage.reportUpdatePanelHeader).toBeHidden();
  await expect(mpage.contentReportArea).toContainText('Content...');
    
});

test('Report Update Panel could be opened', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  await expect(mpage.reportUpdatePanelHeader).toBeVisible();
  await expect(mpage.reportItemsList).toBeVisible();
  await expect(mpage.fullReportUpdateButton).toBeVisible();  
  await expect(mpage.closeReportUpdateButton).toBeVisible();

});

test('Report Update Panel can be closed', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  // check that Panel items are displayed  
  await expect(mpage.reportUpdatePanelHeader).toBeVisible();
  await expect(mpage.reportItemsList).toBeVisible();
  await expect(mpage.fullReportUpdateButton).toBeVisible();  
  await expect(mpage.closeReportUpdateButton).toBeVisible();
  // close panel and check that Panel items are not displayed 
  await mpage.closeUpdatePanel();
  await expect(mpage.reportUpdatePanelHeader).toBeHidden();
  await expect(mpage.reportItemsList).toBeHidden();
  await expect(mpage.fullReportUpdateButton).toBeHidden();  
  await expect(mpage.closeReportUpdateButton).toBeHidden();
});

test('Add single item to report', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  await mpage.addItemToReport("Ford Cortina");
  await mpage.generateReport();
  await expect(mpage.createReportNotification).toContainText('FINISHED');
  await mpage.closeReportNotification();
  await mpage.isItemInReport("Ford Cortina"); 

});

test('Add multiple items to report', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  await mpage.addItemToReport("Ferrari 812 Superfast");
  await mpage.addItemToReport("Seat Tarraco");
  await mpage.generateReport();
  await expect(mpage.createReportNotification).toContainText('FINISHED');
  await mpage.closeReportNotification();
  await mpage.isItemInReport("Ferrari 812 Superfast");
  await mpage.isItemInReport("Seat Tarraco");  
  
});

test('Add items to already existing report', async ({ page }) => {
  
  const mpage = new MainPage(page);
  await mpage.open();
  await mpage.invokeUpdatePanel();
  await mpage.addItemToReport("Ferrari 812 Superfast");
  await mpage.addItemToReport("Seat Tarraco");
  await mpage.generateReport();
  await expect(mpage.createReportNotification).toContainText('FINISHED');
  await mpage.closeReportNotification();
  await mpage.isItemInReport("Ferrari 812 Superfast");
  await mpage.isItemInReport("Seat Tarraco");  
  // add +1 item to a report
  await mpage.addItemToReport("Rolls Royce Wraith");
  await mpage.generateReport();
  await expect(mpage.createReportNotification).toContainText('FINISHED');
  await mpage.closeReportNotification();
  await mpage.isItemInReport("Ferrari 812 Superfast");
  await mpage.isItemInReport("Seat Tarraco");  
  await mpage.isItemInReport("Rolls Royce Wraith");  
  
});