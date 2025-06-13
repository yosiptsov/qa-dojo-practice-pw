import { Locator, Page } from '@playwright/test';

export class HomePage {
    // properties
    page: Page;
    youFeedTabLocator: Locator;
    globalFeedTabLocator: Locator;
    popularTagLocator: Locator;
    firstArticleInListLocator: Locator;
    articleTagListLocator: Locator;

    constructor (page: Page, tagName: string) {
        this.page = page;
        this.youFeedTabLocator = this.page.getByText('Your Feed');
        this.globalFeedTabLocator = this.page.getByText('Global Feed');
        this.popularTagLocator = this.page.locator(`.tag-list a[href='/tag/${tagName}']`);
        this.firstArticleInListLocator = this.page.locator('[data-qa-type=article-list] .article-preview:first-child');
        this.articleTagListLocator = this.page.locator('[data-qa-type=tag-list]').first();
    }
}