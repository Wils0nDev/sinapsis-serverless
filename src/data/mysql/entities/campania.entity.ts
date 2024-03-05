import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm"
import { Usuario } from "./user.entity";

@Entity()
export class Campania {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 200
    })
    nombre: string;

    @CreateDateColumn()
    fechaHoraProgramacion: Date;

    @Column({
        type: "tinyint",
        width:1,
        default: 0
    })
    estado: number;

    @ManyToOne(() => Usuario, (user) => user.id)
    usuario: Usuario
    

 
}