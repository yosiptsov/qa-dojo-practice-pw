import { Page, expect } from '@playwright/test'

export class BasePage {
    page: Page;
    baseUrl: string;

    constructor(page: Page) {
        this.page = page;
    }
    async navigatePage(baseURL: string, pageUrl = '') {
        await this.page.goto(`${baseURL+pageUrl}`);
    }

    async checkCurrentPageTitle(title: string){
        await expect(this.page.locator('[data-test="title"]')).toHaveText(title);
    }
}