import { LoadSurveysRepository } from '../../../protocols/db/survey/load-surveys-repository';
import { SurveysModel } from '../../../../domain/models/survey';
import { ILoadSurveys } from '../../../../domain/usecases/survey/load-surveys';

export class DbLoadSurveys implements ILoadSurveys {
  constructor(private readonly _loadSurveysRepository: LoadSurveysRepository){

  }
  async load(): Promise<SurveysModel[]>{
    const surveysList = await this._loadSurveysRepository.loadAll()
    return surveysList
  }
} 