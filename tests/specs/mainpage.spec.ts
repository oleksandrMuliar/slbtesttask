import { test, expect } from '@playwright/test';
import { MainPage } from './../pages/mainpage';
import { BasePage } from './../pages/basePage';
import { UpdatePanelPage } from './../pages/updatePanelPage';
import { ContentPage } from '../pages/ContentPage';

test.describe('Smoke scenarios', () => {

  test.beforeEach(async ({ page }) => {
    const bPage = new BasePage(page);     
    await bPage.openUrl("/qa-test/");
  });

  test('Smoke scenario #1: Initial page have all the required components', async ({ page }) => {
    
    const mpage = new MainPage(page);
    expect(await page.title()).toEqual("QA Test");
    await expect(mpage.openReportUpdateButton).toBeVisible();
    // await expect(mpage.reportUpdatePanelHeader).toBeHidden(); // ? review
    await expect(mpage.contentReportArea).toContainText('Content...');
      
  });

  test('Smoke scenario #2: Report Update Panel could be invoked', async ({ page }) => {
    
    const mpage = new MainPage(page);
    const updPanel = new UpdatePanelPage(page); 
    await mpage.invokeUpdatePanel();
    // await expect(updPanel.spinner).toBeHidden({timeout: 7000});     
    await expect(updPanel.reportUpdatePanelHeader).toBeVisible();
    await expect(updPanel.reportItemsList).toBeVisible();
    await expect(updPanel.fullReportUpdateButton).toBeVisible();  
    await expect(updPanel.closeReportUpdateButton).toBeVisible();

  });

  test('Smoke scenario #3: Report Update Panel can be closed', async ({ page }) => {
    
    const mpage = new MainPage(page);
    const updPanel = new UpdatePanelPage(page); 
    await mpage.invokeUpdatePanel();
    // await expect(updPanel.spinner).toBeHidden({timeout: 7000});    
    // check that Panel items are displayed  
    await expect(updPanel.reportUpdatePanelHeader).toBeVisible();
    await expect(updPanel.reportItemsList).toBeVisible();
    await expect(updPanel.fullReportUpdateButton).toBeVisible();  
    await expect(updPanel.closeReportUpdateButton).toBeVisible();
    // close panel and check that Panel items are not displayed 
    await updPanel.closeUpdatePanel();
    await expect(updPanel.reportUpdatePanelHeader).toBeHidden();
    await expect(updPanel.reportItemsList).toBeHidden();
    await expect(updPanel.fullReportUpdateButton).toBeHidden();  
    await expect(updPanel.closeReportUpdateButton).toBeHidden();
  });

  test('Smoke scenario #4: Add single item to report', async ({ page }) => {
    
    const mpage = new MainPage(page);
    const updPanel = new UpdatePanelPage(page);
    const contentArea = new ContentPage(page);
    await mpage.invokeUpdatePanel();
    // await expect(updPanel.spinner).toBeHidden({timeout: 7000}); 
    await updPanel.addItemToReport("Ford Cortina");
    await updPanel.generateReport();
    await expect(mpage.createReportNotification).toContainText('FINISHED');
    await mpage.closeReportNotification();
    await contentArea.isItemInReport("Ford Cortina"); 

  });

  test('Smoke scenario #5: Add multiple items to report', async ({ page }) => {
    
    const mpage = new MainPage(page);
    const updPanel = new UpdatePanelPage(page);
    const contentArea = new ContentPage(page);
    await mpage.invokeUpdatePanel();
    // await expect(updPanel.spinner).toBeHidden({timeout: 7000}); 
    await updPanel.addItemToReport("Ferrari 812 Superfast");
    await updPanel.addItemToReport("Seat Tarraco");
    await updPanel.generateReport();
    await expect(mpage.createReportNotification).toContainText('FINISHED');
    await updPanel.closeReportNotification();
    await contentArea.isItemInReport("Ferrari 812 Superfast");
    await contentArea.isItemInReport("Seat Tarraco");  
    
  });

  test('Smoke scenario #6: Add items to already existing report', async ({ page }) => {
    
    const mpage = new MainPage(page);
    const updPanel = new UpdatePanelPage(page);
    const contentArea = new ContentPage(page);
    await mpage.invokeUpdatePanel();
    // await expect(updPanel.spinner).toBeHidden({timeout: 7000}); 
    await updPanel.addItemToReport("Ferrari 812 Superfast");
    await updPanel.addItemToReport("Seat Tarraco");
    await updPanel.generateReport();
    await expect(mpage.createReportNotification).toContainText('FINISHED');
    await mpage.closeReportNotification();
    await contentArea.isItemInReport("Ferrari 812 Superfast");
    await contentArea.isItemInReport("Seat Tarraco");  
    // add +1 item to a report
    await updPanel.addItemToReport("Rolls Royce Wraith");
    await updPanel.generateReport();
    await expect(mpage.createReportNotification).toContainText('FINISHED');
    await mpage.closeReportNotification();
    await contentArea.isItemInReport("Ferrari 812 Superfast");
    await contentArea.isItemInReport("Seat Tarraco");  
    await contentArea.isItemInReport("Rolls Royce Wraith");      
  });

});
