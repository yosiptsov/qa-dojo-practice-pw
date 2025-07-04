import { APIRequestContext } from "@playwright/test";
import { Article, ArticlesCreation } from "./ArticleTypes";

export class ArticleController {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createArticle(articleData: Article, token: string) {
    const requestBody: ArticlesCreation = {
      article: articleData,
    };

    const response = await this.request.post(
      "https://conduit-api.learnwebdriverio.com/api/articles",
      {
        data: requestBody,
        headers: {
          authorization: `Token ${token}`,
        },
      }
    );

    return response;
  }
}
