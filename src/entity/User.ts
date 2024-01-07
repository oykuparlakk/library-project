import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import { Loan } from "./Loan";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column("varchar", { length: 500, nullable: true })
  email!: string;

  @OneToMany(() => Loan, loan => loan.user)
  loans!: Loan[];
}
