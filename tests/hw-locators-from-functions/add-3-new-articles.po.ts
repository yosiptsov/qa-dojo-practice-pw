import { Page } from '@playwright/test';

export function SignUpPage(page: Page, userName?: string) {
  // locators Sign Up
  this.buttonSignUpLocator = page.locator('.btn');
  this.textboxUsernameLocator = page.locator('[placeholder="Username"]');
  this.textboxPasswordLocator = page.locator('[placeholder="Password"]');
  this.textboxEmailLocator = page.locator('[placeholder="Email"]');
  this.newUserHeaderLocator = page.locator(`a[href*="/@${userName}"]`);
  this.registerPage = 'https://demo.learnwebdriverio.com/register';
}

export function AddArticlePage(page: Page, timestamp?: string, elementNumber?: any) {
  // locators Article
  this.newArticleLocator = page.locator('a[href*="/editor"]');
  this.articleTitleLocator = page.locator('input[placeholder="Article Title"]');
  this.articleDescriptionLocator = page.locator('input[placeholder="What\'s this article about?"]');
  this.articleContentLocator = page.locator('[placeholder="Write your article (in markdown)"]');
  this.articleTagsLocator = page.locator('[placeholder="Enter tags"]');
  this.publishArticleButtonLocator = page.locator('[data-qa-id="editor-publish"]');

  // xpath with a parameter inside
  this.createdArticleLocator = page.locator(`//*[@data-qa-type="preview-title"] [text()[contains(.,'${timestamp}')]]`);

  // second version of locator
  this.createdArticleByNumberLocator = page
    .locator(`//*[@data-qa-type="preview-title"] [text()[contains(.,'${timestamp}')]]`)
    .nth(elementNumber);
}

