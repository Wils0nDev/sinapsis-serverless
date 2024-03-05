import {   IsDateString, IsInt, IsOptional, IsString } from "class-validator";



export class FilterMensajeDto {

    @IsInt({
        message : 'Identificador debe ser un número'
    })
    id: number;

    @IsInt({
        message : 'Identificador debe ser un número'
    })
    estadoEnvio: number;

    @IsDateString({
    })
    fechaHoraEnvio: Date;

    @IsString()
    @IsOptional()
    cliente?: string;

}