import { serverError } from "./../../helpers/http-helper";
import { InvalidParamError } from "./../../protocols/errors/invalid-param-error";
import { EmailValidator } from "./../../protocols/email-validator";
import { MissingParamError } from "./../../protocols/errors/missing-param-error";
import { badRequest } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { Authentication } from "../../../domain/usecases/authentication";

export class LoginController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authenticationStub: Authentication
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      const requiredFields = ["email", "password"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      await this.authenticationStub.auth(email, password);
    } catch (err) {
      return serverError(err);
    }
  }
}
