import { test, expect } from '@playwright/test';
import { HeaderPage } from './../pages/HeaderPage';
import { BasePage } from './../pages/basePage';
import { UpdatePanelPage } from './../pages/updatePanelPage';
import { ContentPage } from '../pages/ContentPage';

test.describe('Smoke scenarios', () => {

  test.beforeEach(async ({ page }) => {
    const bPage = new BasePage(page);     
    await bPage.openUrl("/qa-test/");
  });

  test('Smoke scenario #1: Initial page have all the required components', async ({ page }) => {
    
    const header = new HeaderPage(page);
    const content = new ContentPage(page);
    expect(await page.title()).toEqual("QA Test");
    await expect(header.openReportUpdateButton).toBeVisible();
    await expect(content.fullText).toContainText('Content...');
      
  });

  test('Smoke scenario #2: Report Update Panel could be invoked', async ({ page }) => {
    
    const header = new HeaderPage(page);
    const updPanel = new UpdatePanelPage(page); 
    await header.invokeUpdatePanel();
    await expect(updPanel.reportUpdatePanelHeader).toBeVisible();
    await expect(updPanel.reportItemsList).toBeVisible();
    await expect(updPanel.fullReportUpdateButton).toBeVisible();  
    await expect(updPanel.closeReportUpdateButton).toBeVisible();

  });

  test('Smoke scenario #3: Report Update Panel can be closed', async ({ page }) => {
    
    const header = new HeaderPage(page);
    const updPanel = new UpdatePanelPage(page); 
    await header.invokeUpdatePanel();
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
    
    const header = new HeaderPage(page);
    const updPanel = new UpdatePanelPage(page);
    const content = new ContentPage(page);
    await header.invokeUpdatePanel();
    await updPanel.addItemToReport("Ford Cortina");
    await updPanel.generateReport();
    await expect(header.createReportNotification).toContainText('FINISHED');
    await header.closeReportNotification();
    await expect(content.fullText).toContainText(content.formatItemName("Ford Cortina"));    

  });

  test('Smoke scenario #5: Add multiple items to report', async ({ page }) => {
    
    const header = new HeaderPage(page);
    const updPanel = new UpdatePanelPage(page);
    const content = new ContentPage(page);
    await header.invokeUpdatePanel();
    await updPanel.addItemToReport("Ferrari 812 Superfast");
    await updPanel.addItemToReport("Seat Tarraco");
    await updPanel.generateReport();
    await expect(header.createReportNotification).toContainText('FINISHED');
    await updPanel.closeReportNotification();
    await expect(content.fullText).toContainText(content.formatItemName("Ferrari 812 Superfast"));
    await expect(content.fullText).toContainText(content.formatItemName("Seat Tarraco"));
    
  });

  test('Smoke scenario #6: Add items to already existing report', async ({ page }) => {
    
    const header = new HeaderPage(page);
    const updPanel = new UpdatePanelPage(page);
    const content = new ContentPage(page);
    await header.invokeUpdatePanel();
    await updPanel.addItemToReport("Ferrari 812 Superfast");
    await updPanel.addItemToReport("Seat Tarraco");
    await updPanel.generateReport();
    await expect(header.createReportNotification).toContainText('FINISHED');
    await header.closeReportNotification();
    await expect(content.fullText).toContainText(content.formatItemName("Ferrari 812 Superfast"));
    await expect(content.fullText).toContainText(content.formatItemName("Seat Tarraco"));
    // add +1 item to a report
    await updPanel.addItemToReport("Rolls Royce Wraith");
    await updPanel.generateReport();
    await expect(header.createReportNotification).toContainText('FINISHED');
    await header.closeReportNotification();
    await expect(content.fullText).toContainText(content.formatItemName("Ferrari 812 Superfast"));
    await expect(content.fullText).toContainText(content.formatItemName("Seat Tarraco"));
    await expect(content.fullText).toContainText(content.formatItemName("Rolls Royce Wraith"));   

  });

});
