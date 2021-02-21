import { HttpRequest, HttpResponse } from "./../../presentation/protocols/http";
import { Controller } from "./../../presentation/protocols/controller";
import { LogControllerDecorator } from "./log";

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: "Brenda",
        },
      };
      return new Promise((resolve) => resolve(httpResponse));
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes =>{
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

describe("LogController Decorator", () => {
  test("should call controller handle", async () => {
    const {sut, controllerStub} = makeSut();
    const handleSpy = jest.spyOn(controllerStub, "handle");
    const httpRequest = {
      body: {
        name: "any@mail.com",
        email: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
  test("should return the same result of the controller", async () => {
    const {sut} = makeSut();
    const httpRequest = {
      body: {
        name: "any@mail.com",
        email: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: "Brenda",
      },
    });
  });
});