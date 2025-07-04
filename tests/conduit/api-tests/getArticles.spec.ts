import { APIResponse, expect, test } from "@playwright/test";
import fs from "fs";
import { UserController } from '../../../apps/conduitApp/api/users/UserController';
import { UserResponse } from '../../../apps/conduitApp/api/users/UserTypes';
import { ArticleController } from '../../../apps/conduitApp/api/articles/ArticleController';
import {
  Article,
  ArticlesResponse,
} from "../../../apps/conduitApp/api/articles/ArticleTypes";

test("get article - should return articles list", async ({ request }) => {
  // Arrange Act Assert (AAA)

  // Arrange

  // Act

  // http реквести
  const response: APIResponse = await request.get(
    "https://conduit-api.learnwebdriverio.com/api/articles?offset=0&limit=10"
  );

  // Assert

  // отримати body респонзу
  const responseJson: ArticlesResponse = await response.json();
  const responseText = await response.text();
  const responseBuffer = await response.body();

  // вбудовані методи масивів
  const dojoArticles = responseJson.articles.filter((value) =>
    value.tagList!.includes("dojo")
  );

  // проста перевірка
  expect(dojoArticles.length).toBeGreaterThan(1);
});

test("create user - should be created", async ({ request }) => {
  const userController = new UserController(request);

  const requestBody = {
    email: "pspa@gg.com",
    password: "1234",
    username: "psp1234",
  };

  // Act
  const response = await userController.createUser(requestBody);

  // Assert
  const responseJson: UserResponse = await response.json();
  const token = responseJson.user.token;
  expect(token).toBeTruthy();
});

test("login as existed user - should get token", async ({ request }) => {
  const userController = new UserController(request);

  const requestBody = {
    email: "pspa@gg.com",
    password: "1234",
  };

  // Act
  const response = await userController.login(requestBody);

  // Assert
  const responseJson: UserResponse = await response.json();
  const token = responseJson.user.token;
  expect(token).toBeTruthy();
});

test("login as existed user - should be logged", async ({ request }) => {
  // Arrange

  // Act
  const response = await request.post(
    "https://conduit-api.learnwebdriverio.com/api/users/login",
    {
      data: { user: { email: "pspa@gg.com", password: "1234" } },
    }
  );

  const state = await request.storageState();
  fs.writeFileSync(".auth/logged-user.json", JSON.stringify(state));

  // Assert
  const responseJson: UserResponse = await response.json();
  const token = responseJson.user.token;
  expect(token).toBeTruthy();
});

test("create article - should be created", async ({ request }) => {
  // Arrange
  const userController = new UserController(request);
  const articleController = new ArticleController(request);

  const loginResponse = await userController.login({
    email: "pspa@gg.com",
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
