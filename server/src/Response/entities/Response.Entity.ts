import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Form from "../../Form/entities/Form.Entity";
import User from "../../User/entities/User.Entity";

@Entity("response")
export default class ResponseEntity {
  @PrimaryGeneratedColumn()
  response_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: "fk_user_id", referencedColumnName: "user_id" })
  respondent: User;

  @ManyToOne(() => Form, (form) => form.form_id, { nullable: false })
  @JoinColumn({ name: "fk_form_id", referencedColumnName: "form_id" })
  @Index()
  form: Form;
}
