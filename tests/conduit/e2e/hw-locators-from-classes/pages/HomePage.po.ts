import { Locator, Page } from '@playwright/test';

export class HomePage {
    // properties
    page: Page;
    youFeedTabLocator: Locator;
    globalFeedTabLocator: Locator;
    popularTagLocator: Locator;
    firstArticleInListLocator: Locator;
    articleTagListLocator: Locator;

    getPopularTagByName = (tagName: string) => this.page.locator(`.tag-list a[href='/tag/${tagName}']`);

    constructor (page: Page) {
        this.page = page;
        this.youFeedTabLocator = this.page.getByText('Your Feed');
        this.globalFeedTabLocator = this.page.getByText('Global Feed');
        this.firstArticleInListLocator = this.page.locator('[data-qa-type=article-list] .article-preview:first-child');
        this.articleTagListLocator = this.page.locator('[data-qa-type=tag-list]').first();
    }

    // methods
    async clickArticleByTitle(title: string){
        await this.page.locator('[data-qa-type=article-preview]', { hasText: title}).click();
    }

    async clickArticleByNumber(number = 0){
        await this.page.locator('[data-qa-type=article-preview]').nth(number).click();
    }

}