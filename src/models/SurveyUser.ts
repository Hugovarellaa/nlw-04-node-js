import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { surveys } from "./Surveys";
import { User } from "./User";

@Entity("surveys_users")
class SurveyUser {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  survey_id: string;

  @ManyToOne(() => surveys)
  @JoinColumn({ name: "survey_id" })
  survey: surveys;

  @Column()
  value: number;

  @CreateDateColumn()
  create_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { SurveyUser };
