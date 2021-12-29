import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const serveysRepository = getCustomRepository(SurveyRepository);
    const survey = serveysRepository.create({
      title,
      description,
    });
    await serveysRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const serveysRepository = getCustomRepository(SurveyRepository);
    const all = await serveysRepository.find();

    return response.json(all);
  }
}

export { SurveysController };
