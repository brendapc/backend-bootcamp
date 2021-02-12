import { HttpRequest } from './../protocols/http';
import { MissingParamError } from "./../protocols/errors/missing-param-error";
import { SignUpController } from "./signup";

describe("SignUp Controller", () => {
  test("Should return 400 if no name is provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: "any@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });
  test("Should return 400 if no email is provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: "any name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", ()=>{
    const sut = new SignUpController()
    const httpRequest ={
      body: {
        name: "any name",
        email: "any@mail.com",
        passwordConfirmation: "any_password",
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  
  test("Should return 400 if no password confirmation is provided", ()=>{
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: "any name",
        email: "any@mail.com",
        password: "any_password",
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
});
