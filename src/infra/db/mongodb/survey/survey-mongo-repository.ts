import { LoadSurveyByIdRepository } from "./../../../../data/protocols/db/survey/load-survey-by-id-repository";
import { LoadSurveysRepository } from "./../../../../data/protocols/db/survey/load-surveys-repository";
import { SurveysModel } from "./../../../../domain/models/survey";
import { MongoHelper } from "./../helpers/mongo-helper";
import { AddSurveyModel } from "../../../../domain/usecases/survey/add-survey";
import { AddSurveyRepository } from "./../../../../data/protocols/db/survey/add-survey-repository";
import { ObjectId } from "bson";

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection("surveys");
    const result = await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveysModel[]> {
    const surveyCollection = await MongoHelper.getCollection("surveys");
    const surveys = await surveyCollection.find().toArray();
    return surveys && MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<SurveysModel> {
    const surveyCollection = await MongoHelper.getCollection("surveys");
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return survey && MongoHelper.map(survey);
  }
}
