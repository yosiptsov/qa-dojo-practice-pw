import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { Article } from "../../../../apps/conduitApp/api/articles/ArticleTypes";
import { defaultUserData } from "../fixtures/userData";

// rewriting test from fixture
import { test } from "../fixtures/api-fixture";

test.use({ userToLoginEmail: defaultUserData.email });

test.describe("Conduit API Tests - homework tests", { tag: "@api-tests" }, () => {
  test("API-06: added article should be present in /api/articles/ response", async ({ articleController }) => {

    const newArticleBody: Article = {
      title: `YO test article about ${faker.lorem.lines(1)}`,
      description: `YO test article about ${faker.lorem.lines(1)}`,
      body: `YO test article about ${faker.lorem.paragraph()}`,
      tagList: ["YOArticle"],
    };

    await test.step("Create a new article", async () => {
      const createdArticle = await articleController.createArticle(newArticleBody, token!);
      await expect(createdArticle).toBeOK();
    });

    await test.step("Get 10 last articles and make sure added article is present in the list", async () => {
      const article = await articleController.getAllArticlesByTitle(token!, newArticleBody.title!);
      expect(article[0].tagList, `article should contain ${newArticleBody.tagList} in the tag list`).toEqual(
        newArticleBody.tagList
      );
      expect(article[0].title, `article title should be equal to ${newArticleBody.title}`).toBe(newArticleBody.title);
      expect(article.length, 'response should contain at least one article').toBeGreaterThan(0);
    });

    const articleSlugs = await articleController.getAllArticlesByTitle(token!, newArticleBody.title!);

    await test.step("Delete created article", async () => {
      const deleteArticleResponse = await articleController.deleteArticleByTitle(token!, newArticleBody.title!);
      expect(deleteArticleResponse.status()).toEqual(204);
      expect(deleteArticleResponse.statusText()).toEqual('No Content');
    });
  });

  test("API-07: Several identical articles should be created and then deleted", async ({ articleController }) => {

    const newArticleBody: Article = {
      title: `YO test article about ${faker.lorem.lines(1)}`,
      description: `YO test article about ${faker.lorem.lines(1)}`,
      body: `YO test article about ${faker.lorem.paragraph()}`,
      tagList: ["YOArticle"],
    };

    await test.step("Create 3 identical new articles", async () => {
      for(let i=0; i<3; i++){
      const createdArticle = await articleController.createArticle(newArticleBody, token!);
      await expect(createdArticle, `${i} article should be created`).toBeOK();
      }
    });

    await test.step('Delete all added articles', async () => {
      await articleController.deleteAllArticlesByTitle(token!, newArticleBody.title!);
    });
  });

    test("API-08: Several identical articles should be created and then deleted in PARALLEL using PROMISES", async ({ articleController }) => {

    const newArticleBody: Article = {
      title: `YO test article about ${faker.lorem.lines(1)}`,
      description: `YO test article about ${faker.lorem.lines(1)}`,
      body: `YO test article about ${faker.lorem.paragraph()}`,
      tagList: ["YOArticle"],
    };

    await test.step("Create 3 identical new articles", async () => {
      for(let i=0; i<3; i++){
      const createdArticle = await articleController.createArticle(newArticleBody, token!);
      await expect(createdArticle, `${i} article should be created`).toBeOK();
      }
    });

    await test.step('Delete all added articles', async () => {
      await articleController.deleteAllArticlesByTitleInParallelUsingPromises(token!, newArticleBody.title!);
    });
  });
});
