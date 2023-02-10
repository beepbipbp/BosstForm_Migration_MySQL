import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
export default class ResponseEntity {
  @PrimaryColumn()
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
