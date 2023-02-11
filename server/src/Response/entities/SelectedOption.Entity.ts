import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Answer from "./Answer.Entity";

@Entity()
export default class SelectedOption {
  @PrimaryGeneratedColumn()
  selected_option_id: number;

  @ManyToOne(() => Answer, (answer) => answer.answer_id, { nullable: false })
  @JoinColumn({ name: "fk_answer_id", referencedColumnName: "answer_id" })
  answer: Answer;

  @Column({
    type: "varchar",
    length: 50,
  })
  selected_option_name: string;
}
