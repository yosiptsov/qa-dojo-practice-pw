import { Page } from '@playwright/test'

export class ArticleDetailsPage {
    //class attributes
    page: Page;
    getTagByName = (tagName: string) => this.page.locator('[data-qa-type="article-tag"]', { hasText: tagName });
    
    //constructor
    constructor(page: Page){
        this.page = page;
    }

    // methods
    
}