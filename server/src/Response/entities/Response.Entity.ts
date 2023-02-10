import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Response {
  @PrimaryGeneratedColumn()
  response_id: number;

  @Column({
    type: "int",
  })
  @Index()
  fk_form_id: number;

  @Column({
    type: "int",
    nullable: true,
  })
  fk_respondent_id: number;
}
