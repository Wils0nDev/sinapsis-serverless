import {  IsInt, IsString, MinLength } from "class-validator";



export class CreateUsuarioDto {
    
    @IsString({
        message: 'El usuario debe ser una cadena de caracteres'
    })
    @MinLength(1,{
        message: 'El usuario debe tener al menos un caracter'
    })
    usuario: string;
    
    @IsInt()
    cliente: number;
}