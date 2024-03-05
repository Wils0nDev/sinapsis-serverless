import {   IsInt } from "class-validator";



export class SendMensajeDto {
    
    @IsInt({
        message : 'Identificador debe ser un número'
    })
    id: number;

}