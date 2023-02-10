import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Question {
  @PrimaryGeneratedColumn()
  question_id: number;

  @Column({
    type: "int",
  })
  fk_form_id: number;

  @Column({
    type: "int",
  })
  question_order: number;

  @Column({
    type: "varchar",
    length: 15,
  })
  question_type: string;

  @Column({
    type: "varchar",
    length: 100,
    default: "제목 없음",
  })
  question_title: string;

  @Column({
    type: "boolean",
    default: false,
  })
  essential: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  etc_added: true;
}
