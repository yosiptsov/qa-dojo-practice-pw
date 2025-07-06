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

    const response = await this.request.post("https://conduit-api.learnwebdriverio.com/api/articles", {
      data: requestBody,
      headers: {
        authorization: `Token ${token}`,
      },
    });

    return response;
  }

  // returns entire response with list of articles, with possibility to set limit and offset
  private async getResponse(token: string, limit?: number, offset?: number) {
    const response: APIResponse = await this.request.get(
      `https://conduit-api.learnwebdriverio.com/api/articles/?limit=${limit}&offset=${offset}`,
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    // get response body
    const responseJson: ArticlesResponse = await response.json();
    return responseJson;
  }

  async getArticleByTitle(token: string, title: string) {
    const responseJson: ArticlesResponse = await this.getResponse(token, 10);
    const articleByTitle = responseJson.articles.filter((value) => value.title!.includes(title));
    return articleByTitle[0];
  }

  async getAllArticlesByTitle(token: string, title: string) {
    let articlesByTitle = new Array();

    const articlesCount = (await this.getResponse(token, 1)).articlesCount;
    for (let i = 1; i <= Math.trunc(articlesCount / 10) + 1; i++) {
      const responseJson: ArticlesResponse = await this.getResponse(token, 10, i * 10);
      const articleByTitle = responseJson.articles.filter((value) => value.title!.includes(title));
      articlesByTitle = articlesByTitle.concat(articleByTitle);
    }
    return articlesByTitle;
  }

  async deleteArticleByTitle(token: string, title: string) {
    // get response body
    const responseJson: ArticlesResponse = await this.getResponse(token, 10);
    const articleByTitle = responseJson.articles.filter((value) => value.title!.includes(title));

    const deleteResponse: APIResponse = await this.request.delete(
      `https://conduit-api.learnwebdriverio.com/api/articles/${articleByTitle[0].slug}`,
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    return deleteResponse.status();
  }

  async deleteArticleBySlug(token: string, slug: string) {
    // get response body
    const responseJson: ArticlesResponse = await this.getResponse(token, 10);
    const articleBySlug = responseJson.articles.filter((value) => value.slug!.includes(slug));

    const deleteResponse: APIResponse = await this.request.delete(
      `https://conduit-api.learnwebdriverio.com/api/articles/${articleBySlug[0].slug}`,
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    return deleteResponse.status();
  }

}
