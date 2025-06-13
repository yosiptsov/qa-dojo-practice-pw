import { Locator, Page } from '@playwright/test';

export class AddArticlePage {
  // class properties
  page: Page;
  newArticleLocator: Locator;
  articleTitleLocator: Locator;
  articleDescriptionLocator: Locator;
  articleContentLocator: Locator;
  articleTagsLocator: Locator;
  publishArticleButtonLocator: Locator;
  createdArticleLocator: Locator;
  // second version of locator
  createdArticleByNumberLocator: Locator;

  // ? why does it also work without 'this.' Example: this.newArticleLocator = page.locator('a[href*="/editor"]');
  constructor(page: Page, timestamp: string, elementNumber: number) {
    this.page = page;
    this.newArticleLocator = this.page.locator('a[href*="/editor"]');
    this.articleTitleLocator = this.page.locator('input[placeholder="Article Title"]');
    this.articleDescriptionLocator = this.page.locator('input[placeholder="What\'s this article about?"]');
    this.articleContentLocator = this.page.locator('[placeholder="Write your article (in markdown)"]');
    this.articleTagsLocator = this.page.locator('[placeholder="Enter tags"]');
    this.publishArticleButtonLocator = this.page.locator('[data-qa-id="editor-publish"]');

    // xpath with a parameter inside
    this.createdArticleLocator = this.page.locator(
      `//*[@data-qa-type="preview-title"] [text()[contains(.,'${timestamp}')]]`
    );

    // second version of locator
    this.createdArticleByNumberLocator = this.page
      .locator(`//*[@data-qa-type="preview-title"] [text()[contains(.,'${timestamp}')]]`)
      .nth(elementNumber);
  }

  // class methods
  async createNArticles(articleData, timestamp: string, numberOfArticles = 3) {
    await this.newArticleLocator.click();
    for (let i = 0; i < numberOfArticles; i++) {
      await this.articleTitleLocator.fill(`${articleData.articles[i].articleTitle} #Article: ${timestamp}`);
      await this.articleDescriptionLocator.fill(articleData.articles[i].articleDescription);
      await this.articleContentLocator.fill(articleData.articles[i].articleContent);
      await this.articleTagsLocator.fill(
        `${articleData.articles[i].articleTags[0]} ${articleData.articles[i].articleTags[1]}`
      );
      await this.publishArticleButtonLocator.click();
    }
  }
}
