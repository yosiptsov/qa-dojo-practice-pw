import { Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { InventoryItemComponent } from '../components/InventoryItemComponent';
import { HeaderComponent } from '../components/HeaderComponent'

export class InventoryPage extends BasePage {
    itemComponent: InventoryItemComponent;
    headerComponent: HeaderComponent;   

    constructor(page: Page){
        super(page);
        this.itemComponent = new InventoryItemComponent(page);
        this.headerComponent = new HeaderComponent(page);
    }
}