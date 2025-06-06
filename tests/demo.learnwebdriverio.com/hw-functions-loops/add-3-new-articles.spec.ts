import { test, expect, Page } from '@playwright/test';
import articleData from './article.json';

// locators Sign Up
const buttonSignUp = (page: Page) => page.locator('.btn');
const textboxUsername = (page: Page) => page.locator('[placeholder="Username"]');
const textboxPassword = (page: Page) => page.locator('[placeholder="Password"]');
const textboxEmail = (page: Page) => page.locator('[placeholder="Email"]');
const newUserHeader = (page: Page, userName: string) => page.locator(`a[href*="/@${userName}"]`);

// locators Article
const newArticle = (page: Page) => page.locator('a[href*="/editor"]');
const articleTitle = (page: Page) => page.locator('input[placeholder="Article Title"]');
const articleDescription = (page: Page) => page.locator('input[placeholder="What\'s this article about?"]');
const articleContent = (page: Page) => page.locator('[placeholder="Write your article (in markdown)"]');
const articleTags = (page: Page) => page.locator('[placeholder="Enter tags"]');
const publishArticleButton = (page: Page) => page.locator('[data-qa-id="editor-publish"]');

// xpath with a parameter inside
const createdArticle = (page: Page, timestamp: string) =>
  page.locator(`//*[@data-qa-type="preview-title"] [text()[contains(.,'${timestamp}')]]`);

// second version of locator
const createdArticleByNumber = (page: Page, timestamp: string, elementNumber: number) =>
  page.locator(`//*[@data-qa-type="preview-title"] [text()[contains(.,'${timestamp}')]]`).nth(elementNumber);

// functions
async function createUser(userName: string, password: string, userEmail: string, page: Page) {
  const registerPage = 'https://demo.learnwebdriverio.com/register';
  await page.goto(registerPage);
  await textboxUsername(page).fill(userName);
  await textboxEmail(page).fill(userEmail);
  await textboxPassword(page).fill(password);
  await buttonSignUp(page).click();
}

async function createNArticles(page: Page, articleData, timestamp: string, numberOfArticles = 3) {
  await newArticle(page).click();
  for (let i = 0; i < numberOfArticles; i++) {
    await articleTitle(page).fill(`${articleData.articles[i].articleTitle} #Article: ${timestamp}`);
    await articleDescription(page).fill(articleData.articles[i].articleDescription);
    await articleContent(page).fill(articleData.articles[i].articleContent);
    await articleTags(page).fill(`${articleData.articles[i].articleTags[0]} ${articleData.articles[i].articleTags[1]}`);
    await publishArticleButton(page).click();
  }
}

// baseURL overwrite the baseURL in playwright.config.ts
const baseURL = 'https://demo.learnwebdriverio.com';

test.describe('Fields validations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test(
    'Demo-1: a new article should be successfully added',
    { tag: ['@demo', '@HW2', '@article'] },
    async ({ page }) => {
      // test data
      let timestamp = Date.now().toString();
      let userName = `username${timestamp}`;
      let userEmail = `${userName}@gmail1.com`;
      let password = 'mypassword';
      const neededNumberOfArticles = 2;

      await createUser(userName, password, userEmail, page);
      //console.log(newUserHeader(page, userName));
      await expect(newUserHeader(page, userName), 'user should be successfully created').toBeVisible();

      // created several articles according to the parameter neededNumberOfArticles
      await createNArticles(page, articleData, timestamp, neededNumberOfArticles);
      await page.goto(baseURL);

      //expected results - version 1
      await expect(
        createdArticle(page, timestamp).first(),
        'new added articles should be present in the list'
      ).toBeVisible();
      await expect(createdArticle(page, timestamp), 'new added articles should be present in the list').toHaveCount(
        neededNumberOfArticles
      );

      //expected results - version 2
      for (let i = 0; i < neededNumberOfArticles-1; i++) {
        await expect(createdArticleByNumber(page, timestamp, i), `new added article ${i} of ${neededNumberOfArticles-1} should be visible`).toBeVisible();
      }
    }
  );
});
