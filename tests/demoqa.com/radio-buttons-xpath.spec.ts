/*
* Test objective: 
 - select all element types using xpath
* Test result: 
 - Interact with all types of UI elements
* Test data: 
 - is not needed
*/
import { test, expect } from '@playwright/test';

// baseURL overwrite the baseURL in playwright.config.ts
const baseURL = 'https://demoqa.com/text-box';

test.describe('training to build xpath to different elements ', () => {
  test.beforeEach(async ({ page, context }) => {
    //blocking all ads requests
    await context.route(/ads/, (route) => route.abort());
    await page.goto(baseURL);
  });

  test("let's test interaction with text boxes", async ({ page }) => {
    // !SELECTORS
    // inputs
    const fullNameInput = page.locator(`//input[@placeholder="Full Name"]`);
    const emailInput = page.locator('//input[@placeholder="name@example.com"]');

    // input labels
    const fullNameLabel = page.locator('//label[@id="userName-label"]');
    const emailLabel = page.locator('//label[@id="userEmail-label"]');

    // text areas
    const currentAddressArea = page.locator('//textarea[@placeholder="Current Address"]');
    const permanentAddressArea = page.locator('//textarea[@id="permanentAddress"]');

    // text areas labels
    const currentAddressLabel = page.locator('//label[@id="currentAddress-label"]');
    const permanentAddressLabel = page.locator('//label[@id="permanentAddress-label"]');

    // !ACTIONS
    await fullNameInput.fill('Test User');
    await expect(fullNameInput).toHaveValue('Test User');
    await expect(fullNameLabel).toBeVisible();

    await emailInput.fill('TestUser@notReal.email');
    await expect(emailInput).toHaveValue('TestUser@notReal.email');
    await expect(emailLabel).toBeVisible();

    await currentAddressArea.fill('Poltava City, Sobornosti str. 25');
    await expect(currentAddressArea).toHaveValue('Poltava City, Sobornosti str. 25');
    await expect(currentAddressLabel).toBeVisible();

    await permanentAddressArea.fill('Kharkiv City, Poltavsky shlyah str. 25');
    await expect(permanentAddressArea).toHaveValue('Kharkiv City, Poltavsky shlyah str. 25');
    await expect(permanentAddressLabel).toBeVisible();
  });
});
