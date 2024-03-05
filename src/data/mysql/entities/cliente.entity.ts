import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  nombre: string;

  @Column({
    type: "tinyint",
    width: 1,
    default: 0,
  })
  estados?: number;
}

