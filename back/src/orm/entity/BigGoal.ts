import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class BigGoal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column("text")
  title!: string;
}
