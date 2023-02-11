import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Form from "../../Form/entities/Form.Entity";
import ResponseEntity from "../../Response/entities/Response.Entity";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: "varchar",
    length: 20,
  })
  user_name: string;

  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
  })
  refresh_token: string | null;

  @OneToMany(() => Form, (form) => form.user)
  forms: Form[];

  @OneToMany(() => ResponseEntity, (response) => response.respondent)
  responses: ResponseEntity[];

  static findOneByName(userName: string) {
    return this.createQueryBuilder("user").where("user.Name = :userName", { userName }).getOne();
  }

  static findOneByID(userID: number) {
    return this.createQueryBuilder("user").where("user.id = :userID", { userID }).getOne();
  }
}
