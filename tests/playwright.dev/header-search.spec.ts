import { test, expect } from '@playwright/test';

// baseURL overwrite the baseURL in playwright.config.ts
const baseURL = 'https://playwright.dev/';

test.describe('for the wide browser mode', () => {
  
  //set the browser resolution to 1400x874 (standard laptop resolution)
  test.use({
    viewport: { width: 1400, height: 874 },
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('PW-Dev-1: search text box should be present in the header', {tag: ['@pw-dev', '@HW1'] }, async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Search (Command+K)' })).toBeVisible();
  });
});

test.describe('for the mobile browser mode', () => {

  //set the browser resolution to 390x844 (iPhone 12 Pro resolution)  
  test.use({
    viewport: { width: 390, height: 844 },
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('PW-Dev-2: search text box should be present in the header', {tag: ['@pw-dev', '@HW1'] }, async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Search (Command+K)' })).toBeVisible();
  });

  test('PW-Dev-3: search text box should be hidden by default', {tag: ['@pw-dev', '@HW1'] }, async ( {page} ) => {
    await page.getByRole('button', { name: 'Search (Command+K)' }).click();
    await expect(page.getByRole('searchbox', { name: 'Search' })).toBeHidden();
  });

  test('PW-Dev-4: click search icon should open the search text box', {tag: ['@pw-dev', '@HW1'] }, async ( {page} ) => {
    await page.getByRole('button', { name: 'Search (Command+K)' }).click();
    await expect(page.getByRole('searchbox', { name: 'Search' })).toBeVisible();
  });

  test('PW-Dev-5: button Cancel should appear after clicking Search', {tag: ['@pw-dev', '@HW1'] }, async ( {page} ) => {
    await page.getByRole('button', { name: 'Search (Command+K)' }).click();
    await expect(page.getByRole('searchbox', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });

  test('PW-Dev-6: click Cancel should close the search text box', {tag: ['@pw-dev', '@HW1'] }, async ({page}) => {
    await page.getByRole('button', { name: 'Search (Command+K)' }).click();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('searchbox', { name: 'Search' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('searchbox', { name: 'Search' })).toBeHidden();
  });
});
