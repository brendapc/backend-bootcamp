import { makeAddSurveyValidation } from "./add-survey-validation-factory";
import { makeLogControllerDecorator } from "../../../decorators/log-controller-decorator-factory";
import { Controller } from "../../../../../presentation/protocols";
import { AddSurveyController } from "../../../../../presentation/controllers/login/survey/add-survey/add-survey-controller";
import { makeDbAddSurvey } from "../../../usecases/survey/add-survey/db-add-survey-factory";

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey()
  );
  return makeLogControllerDecorator(controller);
};
