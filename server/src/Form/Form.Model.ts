import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import CATEGORY_LIST from "./Form.enum";

@Entity()
export default class Form {
  @PrimaryGeneratedColumn()
  form_id: number;

  @Column({
    type: "int",
  })
  fk_user_id: number;

  @Column({
    type: "varchar",
    length: "50",
    default: "제목 없음",
  })
  title: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
  })
  description: string;

  @Column({
    type: "varchar",
    length: 15,
    enum: CATEGORY_LIST,
    nullable: true,
  })
  category: string;

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
}
