import { Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class Inventory extends BasePage {
    constructor(page: Page){
        super(page);
    }
}