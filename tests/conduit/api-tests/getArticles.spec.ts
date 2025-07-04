import { APIResponse, expect, test } from "@playwright/test";
import fs from "fs";
import { UserController } from "../../../apps/conduitApp/api/users/UserController";
import { UserResponse } from "../../../apps/conduitApp/api/users/UserTypes";
import { ArticleController } from "../../../apps/conduitApp/api/articles/ArticleController";
import { faker } from "@faker-js/faker";
import {
  Article,
  ArticlesResponse,
} from "../../../apps/conduitApp/api/articles/ArticleTypes";

test.describe(
  "Conduit API Tests - classroom tests",
  { tag: "@api-tests" },
  () => {
    test("API-01: get article - should return articles list", async ({
      request,
    }) => {
      // Arrange Act Assert (AAA)

      // Arrange

      // Act

      // http реквести
      const response: APIResponse = await request.get(
        "https://conduit-api.learnwebdriverio.com/api/articles?offset=0&limit=10"
      );

      // Assert

      // get response body
      const responseJson: ArticlesResponse = await response.json();
      const responseText = await response.text();
      const responseBuffer = await response.body();

      // filter articles that contain needed tag
      const dojoArticles = responseJson.articles.filter((value) =>
        value.tagList!.includes("dojo")
      );

      // verify response is not empty
      expect(dojoArticles.length).toBeGreaterThan(1);
    });

    test("API-02: create user - should be created", async ({ request }) => {
      const userController = new UserController(request);

      const requestBody = {
        email: "yoapi1@fakeemail.com",
        password: "1234",
        username: "yoapi1",
      };

      // Act
      const response = await userController.createUser(requestBody);

      // Assert
      const responseJson: UserResponse = await response.json();
      const token = responseJson.user.token;
      expect(token).toBeTruthy();
    });

    test("API-03: login as existed user - should get token", async ({
      request,
    }) => {
      const userController = new UserController(request);

      const requestBody = {
        email: "yoapi1@fakeemail.com",
        password: "1234",
      };

      // Act
      const response = await userController.login(requestBody);

      // Assert
      const responseJson: UserResponse = await response.json();
      const token = responseJson.user.token;
      expect(token).toBeTruthy();
    });

    test("API-04: login as existed user - should be logged", async ({
      request,
    }) => {
      // Arrange

      // Act
      const response = await request.post(
        "https://conduit-api.learnwebdriverio.com/api/users/login",
        {
          data: { user: { email: "yoapi1@fakeemail.com", password: "1234" } },
        }
      );

      const state = await request.storageState();
      fs.writeFileSync(".auth/logged-user.json", JSON.stringify(state));

      // Assert
      const responseJson: UserResponse = await response.json();
      const token = responseJson.user.token;
      expect(token).toBeTruthy();
    });

    test("API-05: create article - should be created", async ({ request }) => {
      // Arrange
      const userController = new UserController(request);
      const articleController = new ArticleController(request);

      const loginResponse = await userController.login({
        email: "yoapi1@fakeemail.com",
        password: "1234",
      });
      const token = await userController.getTokenFromResponse(loginResponse);

      const requestBody: Article = {
        title: "test",
        description: "test",
        body: "## 二级标题",
        tagList: [],
      };

      // Act
      const articleResponse = await articleController.createArticle(
        requestBody,
        token!
      );

      // Assert
      await expect(articleResponse).toBeOK();
    });
  }
);

test.describe(
  "Conduit API Tests - homework tests",
  { tag: "@api-tests" },
  () => {
    test("API-06: added article should be present in /api/articles/ response", async ({
      request,
    }) => {
      // create objects from a needed classes
      const userController = new UserController(request);
      const articleController = new ArticleController(request);

      // login by a user
      const loginResponse = await userController.login({
        email: "yoapi1@fakeemail.com",
        password: "1234",
      });
      // save the logged user token
      const token = await userController.getTokenFromResponse(loginResponse);

      const newArticleBody: Article = {
        title: `YO test article about ${faker.lorem.lines(1)}`,
        description: `YO test article about ${faker.lorem.lines(1)}`,
        body: `YO test article about ${faker.lorem.paragraph()}`,
        tagList: ["YO-Article"],
      };

      await test.step("Create a new article", async () => {
        const createdArticle = await articleController.createArticle(
          newArticleBody,
          token!
        );
        await expect(createdArticle).toBeOK();
      });

      await test.step("Get 10 last articles and make sure added article is present in the list", async () => {
        const article = await articleController.getArticleByTitle(
          token!,
          newArticleBody.title!
        );
        expect(
          article.tagList,
          `article should contain ${newArticleBody.tagList} in the tag list`
        ).toEqual(newArticleBody.tagList);
        expect(
          article.title,
          `article title should be equal to ${newArticleBody.title}`
        ).toBe(newArticleBody.title);
      });

      await test.step("Delete created article", async () => {
        const deleteArticleResponse =
          await articleController.deleteArticleByTitle(
            token!,
            newArticleBody.title!
          );
        expect(deleteArticleResponse).toEqual(204);
      });
    });
  }
);
