import { test as base } from '@playwright/test'
import { AddArticlePage } from '../../../../../apps/conduitApp/pages/AddArticlePage.po';
import { ArticleDetailsPage } from '../../../../../apps/conduitApp/pages/ArticleDetailsPage.po';
import { HomePage } from '../../../../../apps/conduitApp/pages/HomePage.po';
import { SignUpPage } from '../../../../../apps/conduitApp/pages/SignUpPage.po';

type Pages = {
    addArticlePage: AddArticlePage;
    articleDetailsPage: ArticleDetailsPage;
    homePage: HomePage;
    signUpPage: SignUpPage;

}
export const test = base.extend<Pages>({
    page: async ({page}, use) => {
        await page.goto('/');
        await use(page);
        console.log("fixture - conduit - works!!!")
    },
    addArticlePage: async ({page}, use ) => {
        const addArticlePage = new AddArticlePage(page);
        await use(addArticlePage);
    },
    articleDetailsPage: async ({page}, use ) => {
        const articleDetailsPage = new ArticleDetailsPage(page);
        await use(articleDetailsPage);
    },
    homePage: async ({page}, use ) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    signUpPage: async ({page}, use ) => {
        const signUpPage = new SignUpPage(page);
        await use(signUpPage);
    },
    
});