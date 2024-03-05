import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Cliente } from "./cliente.entity";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 30,
        unique: true
    })
    usuario: string


    @Column({
        type: "tinyint",
        width:1,
        default: 0
    })
    estado: number;

    @OneToOne(() => Cliente,)
    @JoinColumn()
    cliente:Cliente;
   
}