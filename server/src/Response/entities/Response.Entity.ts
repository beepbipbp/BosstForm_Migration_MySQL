import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../../User/entities/User.Entity";

@Entity("response")
export default class ResponseEntity {
  @PrimaryGeneratedColumn()
  response_id: number;

  @ManyToOne(() => User, (user) => user.user_id, { nullable: true })
  respondent: User;

  @Column({
    type: "int",
  })
  @Index()
  fk_form_id: number;
}
