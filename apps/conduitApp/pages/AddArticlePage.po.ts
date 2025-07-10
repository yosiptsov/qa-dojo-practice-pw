import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddArticlePage extends BasePage {
  // class properties
  //page is inherited from BasePage
  //this.page = page;
  private newArticleLocator: Locator;
  private articleTitleLocator: Locator;
  private articleDescriptionLocator: Locator;
  private articleContentLocator: Locator;
  private articleTagsLocator: Locator;
  private publishArticleButtonLocator: Locator;
  // second version of locator
  private createdArticleByNumberLocator: Locator;

  getCreatedArticle = (timestamp: string) => this.page.locator(
      `//*[@data-qa-type="preview-title"] [text()[contains(.,'${timestamp}')]]`);
  getCreatedArticleByNumber = (timestamp: string, elementNumber: number) => this.page
      .locator(`//*[@data-qa-type="preview-title"] [text()[contains(.,'${timestamp}')]]`)
      .nth(elementNumber);

  constructor(page: Page) {
    super(page);
    this.newArticleLocator = this.page.locator('a[href*="/editor"]');
    this.articleTitleLocator = this.page.locator('input[placeholder="Article Title"]');
    this.articleDescriptionLocator = this.page.locator('input[placeholder="What\'s this article about?"]');
    this.articleContentLocator = this.page.locator('[placeholder="Write your article (in markdown)"]');
    this.articleTagsLocator = this.page.locator('[placeholder="Enter tags"]');
    this.publishArticleButtonLocator = this.page.locator('[data-qa-id="editor-publish"]');
  }

  // class methods
  async createNArticles(articleData, timestamp: string, numberOfArticles = 1) {
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
