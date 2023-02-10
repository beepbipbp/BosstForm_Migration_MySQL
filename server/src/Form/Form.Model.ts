import { Column, Entity } from "typeorm";

@Entity()
export default class Form {
  @Column()
  form: number;
}
