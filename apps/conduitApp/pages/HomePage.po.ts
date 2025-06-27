import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage{
    // properties
    private yourFeedTabLocator: Locator;
    private globalFeedTabLocator: Locator;
    private popularTagLocator: Locator;
    private firstArticleInListLocator: Locator;
    private articleTagListLocator: Locator;

    getPopularTagByName = (tagName: string) => this.page.locator(`.tag-list a[href='/tag/${tagName}']`);

    constructor (page: Page) {
        super(page);
        this.yourFeedTabLocator = this.page.getByText('Your Feed');
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

    async globalFeedTabClick(){
        await this.globalFeedTabLocator.click();
    }

    async yourFeedTabClick(){
        await this.yourFeedTabLocator.click();
    }

    async checkIfTagIsPresentInListByTagname(tagName: string){
        await expect(this.articleTagListLocator, `tag: ${tagName} should be present in the list`).toContainText(tagName)
    }

}