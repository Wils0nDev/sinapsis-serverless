import {   IsInt, IsOptional, IsString, MinLength } from "class-validator";



export class UpdateMensajeDto {
    
    @IsInt()
    id: number;

    @IsString({
        message: 'El mensaje debe ser una cadena de caracteres'
    })
    @MinLength(1,{
        message: 'El mensaje debe tener al menos un caracter'
    })
    mensaje: string;

    @IsInt()
    @IsOptional()
    estado?: number;

    



}