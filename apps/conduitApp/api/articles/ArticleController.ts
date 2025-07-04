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
    const response: APIResponse = await this.request.get(
      "https://conduit-api.learnwebdriverio.com/api/articles/?limit=10",
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    // get response body
    const responseJson: ArticlesResponse = await response.json();
    const articleByTitle = responseJson.articles.filter((value) =>
      value.title!.includes(title)
    );
    return articleByTitle[0];
  }

  async deleteArticleByTitle(token: string, title: string) {
    const response: APIResponse = await this.request.get(
      "https://conduit-api.learnwebdriverio.com/api/articles/?limit=10",
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    // get response body
    const responseJson: ArticlesResponse = await response.json();
    const articleByTitle = responseJson.articles.filter((value) =>
      value.title!.includes(title)
    );

    const deleteResponse: APIResponse = await this.request.delete(
      `https://conduit-api.learnwebdriverio.com/api/articles/${articleByTitle[0].slug}`,{
        headers: { authorization: `Token ${token}`},
      },      
    );
    return deleteResponse.status();
  }

    async deleteArticleBySlug(token: string, slug: string) {
    const response: APIResponse = await this.request.get(
      "https://conduit-api.learnwebdriverio.com/api/articles/?limit=10",
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    // get response body
    const responseJson: ArticlesResponse = await response.json();
    const articleBySlug = responseJson.articles.filter((value) =>
      value.slug!.includes(slug)
    );

    const deleteResponse: APIResponse = await this.request.delete(
      `https://conduit-api.learnwebdriverio.com/api/articles/${articleBySlug[0].slug}`,{
        headers: { authorization: `Token ${token}`},
      },      
    );
    return deleteResponse.status();
  }

    async editAnArticleByTitle(token: string, title: string) {
    const response: APIResponse = await this.request.get(
      "https://conduit-api.learnwebdriverio.com/api/articles/?limit=10",
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    // get response body
    const responseJson: ArticlesResponse = await response.json();
    const articleByTitle = responseJson.articles.filter((value) =>
      value.title!.includes(title)
    );

    const deleteResponse: APIResponse = await this.request.delete(
      `https://conduit-api.learnwebdriverio.com/api/articles/${articleByTitle[0].slug}`,{
        headers: { authorization: `Token ${token}`},
      },      
    );
    return deleteResponse.status();
  }
}
