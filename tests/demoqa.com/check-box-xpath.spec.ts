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

  test("let's test interaction with checkboxes on different tree levels", async ({ page }) => {
    // !SELECTORS
    // buttons and toggles
    // ? I was not able to find a better way to select this element, only with using 'first'. It is not strong selector, I guess. But what are the other options here?
    const mainMenuButtonCheckBox = page.locator('//li[contains(@class, "btn") and @id="item-1"]').first();
    const expandHome = page.locator('//button[@aria-label="Toggle"]').nth(0); // nth(0) OR first, what is better?
    const expandDocuments = page.locator('//button[@aria-label="Toggle"]').nth(2);
    const expandWorkSpace = page.locator('//button[@aria-label="Toggle"]').nth(3);

    // checkboxes - root level
    const checkboxHome = page.locator('//label[@for="tree-node-home"]');

    // checkboxes - first child level
    // ? it selects entire label, not only checkbox. But it is clickable, I don't see any reasons to go deeper.
    const checkboxDesktop = page.locator('//label[@for="tree-node-desktop"]');
    const checkboxDocuments = page.locator('//label[@for="tree-node-documents"]');
    const checkboxDownloads = page.locator('//label[@for="tree-node-downloads"]');
    // ? if we want to select checkbox, the locator can be supplemented
    const checkboxDocumentChild = page.locator('//label[@for="tree-node-documents"]/span[@class="rct-checkbox"]');

    // checkboxes - second child level
    const checkboxWorkspace = page.locator('//label[@for="tree-node-workspace"]');
    const checkboxOffice = page.locator('//label[@for="tree-node-office"]');

    // messages
    const entireMessage = page.locator('//*[@id="result"]');
    const allMessageChildren = page.locator('//*[@id="result"]/span');

    // !ACTIONS
    // open needed tab 'checkboxes'
    await mainMenuButtonCheckBox.click();
    // expand the root of the checkbox tree
    await expandHome.click();
    // expand Documents
    await expandDocuments.click();
    // expand WorkSpace
    await expandWorkSpace.click();
    // tick the node WorkSpace
    await checkboxWorkspace.click();

    // expect that the message is equal to the needed one
    const neededMessage = 'You have selected : workspace react angular veu';
    expect(neededMessage).toEqual(await getMessageText(allMessageChildren));

    // ? I had an idea, to tick the checkbox 'Workspace', then combine all the child nodes into a string and check the message contained all the selected nodes. I was done this partly. Selecting all checkbox values was hard than a thought, took a lot of time so I had to stop )
  });
});
