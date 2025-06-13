import { Page } from '@playwright/test';
import { SignUpPage, AddArticlePage } from './add-3-new-articles.po'

// functions
export async function createUser(userName: string, password: string, userEmail: string, page: Page) {
  const signUpPage = new SignUpPage(page, userName);
  await page.goto(signUpPage.registerPage);
  await signUpPage.textboxUsernameLocator.fill(userName);
  await signUpPage.textboxEmailLocator.fill(userEmail);
  await signUpPage.textboxPasswordLocator.fill(password);
  await signUpPage.buttonSignUpLocator.click();
}

export async function createNArticles(page: Page, articleData, timestamp: string, numberOfArticles = 3) {
  const addArticlePage = new AddArticlePage(page);
  await addArticlePage.newArticleLocator.click();
  for (let i = 0; i < numberOfArticles; i++) {
    await addArticlePage.articleTitleLocator.fill(`${articleData.articles[i].articleTitle} #Article: ${timestamp}`);
    await addArticlePage.articleDescriptionLocator.fill(articleData.articles[i].articleDescription);
    await addArticlePage.articleContentLocator.fill(articleData.articles[i].articleContent);
    await addArticlePage.articleTagsLocator.fill(`${articleData.articles[i].articleTags[0]} ${articleData.articles[i].articleTags[1]}`);
    await addArticlePage.publishArticleButtonLocator.click();
  }
}
