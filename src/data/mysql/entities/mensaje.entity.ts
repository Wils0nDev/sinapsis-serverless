import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Campania } from "./campania.entity";

@Entity()
export class Mensaje {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "tinyint",
        default: 1
    })
    estadoEnvio: number;

    
    @Column({
        type: 'datetime',
        nullable : true
    })
    fechaHoraEnvio?: Date;

    @Column({
        type: "varchar",
        length: 160
    })
    mensaje: string

    @Column({
        type: "tinyint",
        width:1,
        default: 1
    })
    estado?: number;

    @ManyToOne(() => Campania, (campania) => campania.id)
    campania: Campania

   
}