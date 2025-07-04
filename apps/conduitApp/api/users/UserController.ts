import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { User, UserRequest, UserResponse } from "./UserTypes";

export class UserController {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(userData: { email: string; password: string }) {
    const response = await this.request.post(
      "https://conduit-api.learnwebdriverio.com/api/users/login",
      {
        data: { user: userData },
      }
    );

    return response;
  }

  async createUser(userData: User) {
    const body: UserRequest = {
      user: userData,
    };

    const response = await this.request.post(
      "https://conduit-api.learnwebdriverio.com/api/users",
      {
        data: body,
      }
    );

    return response;
  }

  async getTokenFromResponse(response: APIResponse) {
    const responseJson: UserResponse = await response.json();
    const token = responseJson.user.token;
    expect(token).toBeTruthy();

    return token;
  }
}
