import { EntityRepository, Repository } from "typeorm";
import { surveys } from "../models/Surveys";

@EntityRepository(surveys)
class SurveyRepository extends Repository<surveys> {}

export { SurveyRepository };
