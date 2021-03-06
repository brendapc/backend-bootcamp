import { forbbiden } from "../../../helpers/http/http-helper";
import { badRequest, ok, serverError } from "../../../helpers/http/http-helper";
import { Validation } from "../../../protocols/validation";
import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Authentication,
} from "./signup-controller-protocols";
import { EmailInUseError } from "../../../errors";

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      if (!account) {
        return forbbiden(new EmailInUseError());
      }
      const accessToken = await this.authentication.auth({
        email,
        password,
      });
      return ok({ accessToken: accessToken });
    } catch (err) {
      console.error(err);
      return serverError(err);
    }
  }
}
