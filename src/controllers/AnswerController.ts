import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Apperror } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

//http://localhost:3333/answers/1?u=e905705f-fe72-442c-9761-7f4d2ef7b909

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveyUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new Apperror("Survey User does not Exists!");
    }

    surveyUser.value = Number(value);

    await surveyUsersRepository.save(surveyUser);
    return response.status(200).json(surveyUser);
  }
}

export { AnswerController };
