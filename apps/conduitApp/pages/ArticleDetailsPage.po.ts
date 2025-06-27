import { Page } from '@playwright/test'
import { BasePage } from './BasePage';

export class ArticleDetailsPage extends BasePage{
    //class attributes
    // page: Page; inherited from BasePage
    getTagByName = (tagName: string) => this.page.locator('[data-qa-type="article-tag"]', { hasText: tagName });
    
    //constructor
    constructor(page: Page){
        super(page);
    }

    // methods
    
}