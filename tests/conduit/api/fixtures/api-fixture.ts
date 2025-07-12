import { ArticleController } from "../../../../apps/conduitApp/api/articles/ArticleControllerAuthInFixture";
import { UserController } from "../../../../apps/conduitApp/api/users/UserController";
import { test as base, expect } from "@playwright/test";
import { UserResponse } from "../../../../apps/conduitApp/api/users/UserTypes";
import * as fs from "fs";
import { request as newRequest } from "@playwright/test";

type ApiControllers = {
  userController: UserController;
  articleController: ArticleController;
  userToLoginEmail: string | undefined;
};

export const test = base.extend<ApiControllers>({
  userToLoginEmail: undefined,

  request: async ({ request, userToLoginEmail }, use) => {
    if (userToLoginEmail) {
      if (fs.existsSync(`.auth/${userToLoginEmail}.json`)) {
        const token = fs.readFileSync(`.auth/${userToLoginEmail}.json`, {
          encoding: "utf8",
        });

        const context = await newRequest.newContext({
          extraHTTPHeaders: {
            authorization: `Token ${token}`,
          },
        });

        await use(context);
      } else {
        const response = await request.post("/api/users/login", {
          data: {
            user: {
              email: userToLoginEmail,
              password: process.env.CONDUIT_DEFAULT_PASSWORD,
            },
          },
          failOnStatusCode: true,
        });

        const responseJson: UserResponse = await response.json();
        const token = responseJson.user.token;
        fs.writeFileSync(`.auth/${userToLoginEmail}.json`, token!);

        const context = await newRequest.newContext({
          extraHTTPHeaders: {
            authorization: `Token ${token}`,
          },
        });

        await use(context);
      }
    } else await use(request);

    // cleanup
    // if (global.registeredArticles.length > 0) {
    //   const token = fs.readFileSync(`.auth/${userToLoginEmail}.json`, {
    //     encoding: "utf8",
    //   });

    //   const context = await newRequest.newContext({
    //     extraHTTPHeaders: {
    //       authorization: `Token ${token}`,
    //     },
    //   });

    //   const articleController = new ArticleController(context);

    //   for (const slug of global.registeredArticles) {
    //     await articleController.delete(slug);
    //   }
    // }
  },
  userController: async ({ request }, use) => {
    const userController = new UserController(request);

    await use(userController);
  },
  articleController: async ({ request }, use) => {
    const articleController = new ArticleController(request);

    await use(articleController);
  },
});

export default expect;
