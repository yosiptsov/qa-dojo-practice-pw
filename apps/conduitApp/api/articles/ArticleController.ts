import { APIRequestContext, APIResponse } from "@playwright/test";
import { Article, ArticlesCreation, ArticlesResponse } from "./ArticleTypes";

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
  async getArticleByTitle(token: string, title: string) {
    const response: APIResponse = await this.request.get('https://conduit-api.learnwebdriverio.com/api/articles/?limit=10', {
      headers: {authorization: `Token ${token}`},
    })
        // отримати body респонзу
        const responseJson: ArticlesResponse = await response.json();
        const responseText = await response.text();
        const responseBuffer = await response.body();
        
        const articleByTitle = responseJson.articles.filter((value) => value.title!.includes(title));
        return articleByTitle[0];
  }
}
