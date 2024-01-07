import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Book)
  book!: Book;

  @Column({ nullable: true, default: null, type: "float" })
  rating!: number;

  @Column({ nullable: true, default: null })
  returnedAt!: Date;
}
