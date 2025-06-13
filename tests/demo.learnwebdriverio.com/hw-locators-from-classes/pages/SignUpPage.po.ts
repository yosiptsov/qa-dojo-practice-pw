import { Locator, Page } from '@playwright/test';

export class SignUpPage {
  // class properties
  page: Page;
  buttonSignUpLocator: Locator;
  textboxUsernameLocator: Locator;
  textboxPasswordLocator: Locator;
  textboxEmailLocator: Locator;
  newUserHeaderLocator: Locator;
  registerPage: string; // ? String or string?

  // ? how can I use parameterized locators?
  constructor(page: Page, userName: string) {
    this.page = page;
    this.buttonSignUpLocator = this.page.locator('.btn');
    this.textboxUsernameLocator = this.page.locator('[placeholder="Username"]');
    this.textboxPasswordLocator = this.page.locator('[placeholder="Password"]');
    this.textboxEmailLocator = this.page.locator('[placeholder="Email"]');
    this.newUserHeaderLocator = this.page.locator(`a[href*="/@${userName}"]`);
    this.registerPage = 'https://demo.learnwebdriverio.com/register';
  }

  // class methods
  async createUser(userName: string, password: string, userEmail: string) {
    await this.page.goto(this.registerPage);
    await this.textboxUsernameLocator.fill(userName);
    await this.textboxEmailLocator.fill(userEmail);
    await this.textboxPasswordLocator.fill(password);
    await this.buttonSignUpLocator.click();
  }
}
