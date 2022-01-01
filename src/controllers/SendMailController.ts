import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { surveys } from "../models/Surveys";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailServices from "../services/SendMailServices";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveyRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });
    if (!user) {
      return response.status(400).json({
        error: "User does not exists",
      });
    }

    const survey = await surveysRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      return response.status(400).json({
        error: "Survey does not exist",
      });
    }

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL,
    };
    const npsPath = resolve(__dirname, "../views/emails/npsMail.hbs");

    const surveyAlready = await surveysUsersRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations: ["user", "survey"],
    });

    if (surveyAlready) {
      await SendMailServices.execute(email, survey.title, variables, npsPath);
      return response.json(surveyAlready);
    }
    //Salvar as informações na tabela surveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);
    //Enviar e-mail para o usuário

    await SendMailServices.execute(email, survey.title, variables, npsPath);

    return response.json(surveyUser);
  }
}

export { SendMailController };
