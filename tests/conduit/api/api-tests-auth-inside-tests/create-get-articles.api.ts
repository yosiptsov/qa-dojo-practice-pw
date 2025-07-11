import { APIResponse, expect, test } from "@playwright/test";
import fs from "fs";
import { UserController } from "../../../../apps/conduitApp/api/users/UserController";
import { UserResponse } from "../../../../apps/conduitApp/api/users/UserTypes";
import { ArticleController } from "../../../../apps/conduitApp/api/articles/ArticleController";
import { faker } from "@faker-js/faker";
import { Article, ArticlesResponse } from "../../../../apps/conduitApp/api/articles/ArticleTypes";

test.describe("Conduit API Tests - classroom tests - create and get articles", { tag: "@api-tests" }, () => {
  test("API-01: get article - should return articles list", async ({ request }) => {
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
    const yoArticles = responseJson.articles.filter((value) => value.tagList!.includes('YOArticle'));

    // verify response is not empty
    expect(yoArticles.length).toBeGreaterThan(0);
  });

  test("API-02: create user - should be created", async ({ request }) => {
    const userController = new UserController(request);

    const requestBody = {
      email: "yoapi10@fakeemail.com",
      password: "1234",
      username: "yoapi10",
    };

    // Act
    const response = await userController.createUser(requestBody);

    // Assert
    const responseJson: UserResponse = await response.json();
    const token = responseJson.user.token;
    expect(token).toBeTruthy();
    console.log(response.status);
  });

  test("API-03: login as existed user - should get token", async ({ request }) => {
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

  test("API-04: login as existed user - should be logged", async ({ request }) => {
    // Arrange

    // Act
    const response = await request.post("https://conduit-api.learnwebdriverio.com/api/users/login", {
      data: { user: { email: "yoapi1@fakeemail.com", password: "1234" } },
    });

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
    const articleResponse = await articleController.createArticle(requestBody, token!);

    // Assert
    await expect(articleResponse).toBeOK();
  });
});
