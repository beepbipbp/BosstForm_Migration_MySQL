import { Column, Entity, Timestamp } from "typeorm";

@Entity()
export default class Form {
  @Column()
  form_id: number;

  @Column()
  fk_user_id: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  accept_response: boolean;

  @Column()
  on_board: boolean;

  @Column()
  login_required: boolean;

  @Column()
  response_modifiable: boolean;

  @Column()
  response_count: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
