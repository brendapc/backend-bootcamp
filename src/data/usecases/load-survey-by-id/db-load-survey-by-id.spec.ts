import MockDate from "mockdate";
import { SurveysModel } from "../../../domain/models/survey";
import { LoadSurveyByIdRepository } from "../../protocols/db/survey/load-survey-by-id-repository";
import { DbLoadSurveyById } from "./db-load-survey-by-id";

interface SutTypes{
    sut: DbLoadSurveyById;
    loadSurveyByIdRepository: LoadSurveyByIdRepository;
}

const makeFakeSurvey = (): SurveysModel => {
    return {
        id: "any_id",
        question: "any_question",
        answers: [
          {
            image: "any_image",
            answer: "any_answer",
          },
        ],
        date: new Date(),
    }
  };
  
const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository =>{
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById():  Promise<SurveysModel>{
            return new Promise(resolve => resolve(makeFakeSurvey()))
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}

const makeSut = (): SutTypes =>{
    const loadSurveyByIdRepository = makeLoadSurveyByIdRepositoryStub()
    const sut = new DbLoadSurveyById(loadSurveyByIdRepository)
    return{
        sut,
        loadSurveyByIdRepository
    }
}

describe('DbLoadSurveyById', () => {
    beforeAll(() => {
        MockDate.set(new Date());
      });
    
      afterAll(() => {
        MockDate.reset();
      });
    test('should call LoadSurveyByIdRepository ', async () => {
        const { sut, loadSurveyByIdRepository } = makeSut()
        const loadByIdSpy = jest.spyOn(loadSurveyByIdRepository, 'loadById')
        await sut.loadById('any_id')
        expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
    })

})