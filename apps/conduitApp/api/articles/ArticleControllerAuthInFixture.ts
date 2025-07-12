import { APIRequestContext, APIResponse } from "@playwright/test";
import { Article, ArticlesCreation, ArticlesResponse } from "./ArticleTypes";

export class ArticleController {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }
//I made token is not required for ALL methods because tests with fixtures use authentication inside the fixture, 
//but still exist tests without fixtures which use auth inside the test
  async createArticle(articleData: Article, token?: string) {
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
  private async getResponse(limit?: number, offset?: number, token?: string) {
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

  async getArticleByTitle(title: string, token?: string) {
    const responseJson: ArticlesResponse = await this.getResponse(10, 0, token);
    const articleByTitle = responseJson.articles.filter((value) => value.title!.includes(title));
    return articleByTitle[0];
  }

  async getAllArticlesByTitle(title: string, token?: string) {
    let articlesByTitle: Article[] = new Array();

    const articlesCount = (await this.getResponse(1, 0, token)).articlesCount;
    for (let i = 0; i <= Math.trunc(articlesCount / 10) + 1; i++) {
      const responseJson: ArticlesResponse = await this.getResponse(10, i * 10, token);
      const filteredArticles = responseJson.articles.filter((value) => value.title!.includes(title));
      articlesByTitle = articlesByTitle.concat(filteredArticles);
    }
    return articlesByTitle;
  }

  async deleteArticleByTitle(title: string, token?: string) {
    // get response body
    const responseJson: ArticlesResponse = await this.getResponse(10, 0, token);
    const articleByTitle = responseJson.articles.filter((value) => value.title!.includes(title));

    const deleteResponse: APIResponse = await this.request.delete(
      `https://conduit-api.learnwebdriverio.com/api/articles/${articleByTitle[0].slug}`,
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    return deleteResponse;
  }

  async deleteArticleBySlug(slug: string, token?: string) {
    // get response body
    const responseJson: ArticlesResponse = await this.getResponse(10, 0, token);
    const articleBySlug = responseJson.articles.filter((value) => value.slug!.includes(slug));

    const deleteResponse: APIResponse = await this.request.delete(
      `https://conduit-api.learnwebdriverio.com/api/articles/${articleBySlug[0].slug}`,
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    return deleteResponse;
  }

  async deleteAllArticlesByTitle(title: string, token?: string) {
    let articlesByTitleArray: String[] = new Array();

    const filteredArticles = await this.getAllArticlesByTitle(title, token!);
    articlesByTitleArray.push(...filteredArticles.map((article) => article.slug!));

    // delete all find articles
    for (const slug of articlesByTitleArray) {
      const deleteResponse: APIResponse = await this.request.delete(
        `https://conduit-api.learnwebdriverio.com/api/articles/${slug}`,
        { headers: { authorization: `Token ${token}` } }
      );
    }
  }

  async deleteAllArticlesByTitleInParallelUsingPromises(title: string, token?: string) {
    let articlesByTitleArray: String[] = new Array();

    const filteredArticles = await this.getAllArticlesByTitle(token!, title);
    articlesByTitleArray.push(...filteredArticles.map((article) => article.slug!));

    const deletePromises = articlesByTitleArray.map((slug) =>
      this.request
        .delete(`https://conduit-api.learnwebdriverio.com/api/articles/${slug}`, {
          headers: { authorization: `Token ${token}` },
        })
        .then((res) => {
          console.log(`Deleted ${slug}`);
          return res;
        })
        .catch((err) => {
          console.error(`Failed to delete: ${slug}`, err);
        })
    );
    await Promise.all(deletePromises);
  }
}
