import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
  refresh_token?: string | null;

  static findOneByName(userName: string) {
    return this.createQueryBuilder("user").where("user.Name = :userName", { userName }).getOne();
  }

  static findOneByID(userID: number) {
    return this.createQueryBuilder("user").where("user.id = :userID", { userID }).getOne();
  }
}
