import {   IsDateString, IsInt, IsOptional, IsString } from "class-validator";



export class FilterMensajeDto {

    @IsInt({
        message: 'Envie un estado'
    })
    estado: number;

    @IsInt({
        message : 'Identificador debe ser un número'
    })
    estadoEnvio: number;

    @IsDateString({
    })
    fechaHoraEnvio: Date;

    @IsInt()
    @IsOptional()
    cliente?: number;

}