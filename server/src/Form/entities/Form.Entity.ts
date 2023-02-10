import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../../User/entities/User.Entity";

@Entity()
export default class Form {
  @PrimaryGeneratedColumn()
  form_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  author: User;

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
}
