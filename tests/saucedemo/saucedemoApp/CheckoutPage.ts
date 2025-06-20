import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

type CheckoutUserInformation = {
  firstName: string;
  lastName: string;
  zipCode: string;
};

export class CheckoutPage extends BasePage {
  // page is inherited from BasePage
  cancelButtonLocator: Locator;
  continueButtonLocator: Locator;
  finishButtonLocator: Locator;
  completeHeaderLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.cancelButtonLocator = page.locator('[data-test="cancel"]');
    this.continueButtonLocator = page.locator('[data-test="continue"]');
    this.finishButtonLocator = page.locator('[data-test="finish"]');
    this.completeHeaderLocator = page.locator('[data-test="complete-header"]', {hasText: 'Thank you for your order!'});
  }

  async fillInCheckoutInformation(checkoutUserInformation: CheckoutUserInformation) {
    await this.page.locator('[data-test="firstName"]').fill(checkoutUserInformation.firstName);
    await this.page.locator('[data-test="lastName"]').fill(checkoutUserInformation.lastName);
    await this.page.locator('[data-test="postalCode"]').fill(checkoutUserInformation.zipCode);
  }
}
