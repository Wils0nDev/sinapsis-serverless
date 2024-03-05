import {  IsInt, IsString, MinLength } from "class-validator";



export class CreateMensajeDto {
    
    @IsString({
        message: 'El mensaje debe ser una cadena de caracteres'
    })
    @MinLength(1,{
        message: 'El mensaje debe tener al menos un caracter'
    })
    mensaje: string;

    @IsInt()
    campania: number;



}