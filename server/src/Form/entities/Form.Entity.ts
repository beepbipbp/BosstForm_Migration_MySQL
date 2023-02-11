import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import ResponseEntity from "../../Response/entities/Response.Entity";
import User from "../../User/entities/User.Entity";
import Question from "./Question.Entity";

@Entity()
export default class Form {
  @PrimaryGeneratedColumn()
  form_id: number;

  @ManyToOne(() => User, (user) => user.user_id, { nullable: false })
  @JoinColumn({ name: "fk_user_id", referencedColumnName: "user_id" })
  user: User;

  @Column({
    type: "varchar",
    length: "50",
    default: "제목 없음",
  })
  form_title: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
  })
  form_description: string;

  @Column({
    type: "varchar",
    length: 15,
    nullable: true,
  })
  form_category: string;

  @Column({
    type: "boolean",
    default: false,
  })
  accept_response: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  on_board: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  login_required: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  response_modifiable: boolean;

  @Column({
    type: "int",
    default: 0,
  })
  response_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Question, (question) => question.form)
  questions: Question[];

  @OneToMany(() => ResponseEntity, (response) => response.form)
  responses: ResponseEntity[];
}
