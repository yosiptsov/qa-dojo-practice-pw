import { Page, expect } from '@playwright/test'

export abstract class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async checkCurrentPageTitle(title: string){
        await expect(this.page.locator('[data-test="title"]')).toHaveText(title);
    }
}