import {  IsString, MinLength } from "class-validator";



export class CreateClienteDto {
    
    @IsString({
        message: 'El nombre debe ser una cadena de caracteres'
    })
    @MinLength(1,{
        message: 'El nombre debe tener al menos un caracter'
    })
    nombre: string;
}