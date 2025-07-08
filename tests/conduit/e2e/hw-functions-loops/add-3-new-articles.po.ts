import { test, expect, Page} from '@playwright/test';
import articleData from './article.json';

      // locators Sign Up
      const buttonSignUp = (page: Page) => page.locator('.btn');
      const textboxUsername = (page: Page) => page.locator('[placeholder="Username"]');
      const textboxEmail = (page: Page) => page.locator('[placeholder="Email"]');
      const newUserHeader = (page: Page, userName: string) => page.locator(`a[href*="/@${userName}"]`);
      
      // locators Article
      const newArticle = (page: Page) => page.locator('a[href*="/editor"]');
      const articleTitle = (page: Page) => page.locator('input[placeholder="Article Title"]');
      const articleDescription = (page: Page) => page.locator('input[placeholder="What\'s this article about?"]');
      const articleContent = (page: Page) => page.locator('[placeholder="Write your article (in markdown)"]');
      const articleTags = (page: Page) => page.locator('[placeholder="Enter tags"]');
      const publishArticleButton = (page: Page) => page.locator('[data-qa-id="editor-publish"]');
      // const addedArticleHeader = (page: Page, articles: object, articleNumber: number) => page.getByRole('heading', {
      //   name: articleData.articles[articleNumber].articleTitle,
      // });


export async function createUser(userName: string, userEmail: string, page: Page) {
        const registerPage = 'https://demo.learnwebdriverio.com/register';
        await page.goto(registerPage);
        await textboxUsername(page).fill(userName);
        await textboxEmail(page).fill(userEmail);
        await buttonSignUp(page).click();
}

export async function createNArticles(page: Page, articleData) {
        await newArticle(page).click();
        await articleTitle(page).fill(articleData.articles[0].articleTitle);
        await articleDescription(page).fill(articleData.articles[0].articleDescription);
        await articleContent(page).fill(articleData.articles[0].articleContent);
        await articleTags(page).fill(`${articleData.articles[0].articleTags[0]} ${articleData.articleTags[1]}`);
        await publishArticleButton(page).click();
}