import { DbSaveSurveyResult } from "./db-save-survey-result";
import MockDate from "mockdate";
import { ISurveyResultModel } from "../../../../domain/models/survey-result";
import { ISaveSurveyResultParams } from "../../../../domain/usecases/survey-result/save-survey-result";
import { ISaveSurveyResultRepository } from "../../../protocols/db/survey-result/save-survey-result-repository";

const makeFakeSurveyResult = (): ISurveyResultModel => ({
  surveyId: "any_survey_id",
  question: "any_question",
  answers: [
    {
      answer: "any_answer",
      count: 1,
      percent: 50,
    },
  ],
  date: new Date(),
});

const makeFakeSurveyResultData = (): ISaveSurveyResultParams => ({
  accountId: "any_account_id",
  surveyId: "any_survey_id",
  answer: "any_answer",
  date: new Date(),
});
const makeSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class saveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save(data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
      return new Promise((resolve) => resolve(makeFakeSurveyResult()));
    }
  }
  return new saveSurveyResultRepositoryStub();
};
interface SutTypes {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository;
}
const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return {
    saveSurveyResultRepositoryStub,
    sut,
  };
};

describe("DbSaveSurveyResult Usecase", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test("should call SaveSurveyResultRepository with correct values", async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, "save");
    const surveyResultData = makeFakeSurveyResultData();
    await sut.save(surveyResultData);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test("should throw if SaveSurveyResultRepository throws", async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(saveSurveyResultRepositoryStub, "save")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.save(makeFakeSurveyResultData());
    await expect(promise).rejects.toThrow();
  });

  test("should return SurveyResult on success", async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(makeFakeSurveyResultData());
    expect(surveyResult).toEqual(makeFakeSurveyResult());
  });
});
