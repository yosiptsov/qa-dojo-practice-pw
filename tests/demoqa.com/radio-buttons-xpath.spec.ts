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
const baseURL = 'https://demoqa.com/radio-button';

test.describe('training to build xpath to different elements ', () => {
  test.beforeEach(async ({ page, context }) => {
    //blocking all ads requests
    await context.route(/ads/, (route) => route.abort());
    await page.goto(baseURL);
  });

  // let's combine all the message values into one string
  async function getMessageText(locator) {
    const count = await locator.count();
    let message = '';

    for (let i = 0; i < count; i++) {
      const text = await locator.nth(i).textContent();
      message += (text?.trim() || '') + ' ';
    }
    return message.trim();
  }

  test("DemoQA-2: let's test interaction with radio buttons",{tag: ['@demo-qa', '@HW4'] }, async ({ page }) => {
    // !SELECTORS
    const checkboxImpressive = page.locator('//label[@for="impressiveRadio"]');
    const checkboxYes = page.locator('//label[@for="yesRadio"]');
    const checkboxNo = page.locator('//label[@for="noRadio"]');
    const checkboxes = page.locator('//label[contains(@for, "Radio")]'); // selects all checkboxes (3 items)
    const message = page.locator('//p[@class="mt-3"]');
    
    // !ACTIONS
    await checkboxImpressive.click();
    const neededMessage = 'You have selected Impressive';
    expect(neededMessage).toEqual(await getMessageText(message));
    console.log(await getMessageText(message));
  });
});
