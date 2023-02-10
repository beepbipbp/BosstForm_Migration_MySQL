import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class SelectedOption {
  @PrimaryGeneratedColumn()
  selected_option_id: number;

  @Column({
    type: "int",
  })
  fk_answer_id: number;

  @Column({
    type: "varchar",
    length: 50,
  })
  selected_option_name: string;
}
