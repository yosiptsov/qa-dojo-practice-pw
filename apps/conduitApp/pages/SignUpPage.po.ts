import { Locator, Page , expect } from '@playwright/test';
import { BasePage } from './BasePage';
  
type User = {
    userName: string,
    userEmail: string,
    password: string
}

export class SignUpPage extends BasePage{
  // class properties
  private buttonSignUpLocator: Locator;
  private textboxUsernameLocator: Locator;
  private textboxPasswordLocator: Locator;
  private textboxEmailLocator: Locator;
  //newUserHeaderLocator: Locator;
  private registerPage: string;
  // get locator of the created user
  private getUserProfileLocatorByUserName = (userName: string) => this.page.locator(`a[href*="/@${userName}"]`);

  constructor(page: Page) {
    super(page);
    this.buttonSignUpLocator = this.page.locator('.btn');
    this.textboxUsernameLocator = this.page.locator('[placeholder="Username"]');
    this.textboxPasswordLocator = this.page.locator('[placeholder="Password"]');
    this.textboxEmailLocator = this.page.locator('[placeholder="Email"]');
    this.registerPage = 'https://demo.learnwebdriverio.com/register';
  }

  // class methods
  async createUser(user: User) {
    await this.page.goto(this.registerPage);
    await this.textboxUsernameLocator.fill(user.userName);
    await this.textboxEmailLocator.fill(user.userEmail);
    await this.textboxPasswordLocator.fill(user.password);
    await this.buttonSignUpLocator.click();
    await expect(this.getUserProfileLocatorByUserName(user.userName), 'user should be successfully created').toBeVisible();
  }
}
