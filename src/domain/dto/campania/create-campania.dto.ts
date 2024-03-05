import {  IsInt, IsString, MinLength } from "class-validator";



export class CreateCampaniaDto {
    
    @IsString({
        message: 'El nombre debe ser una cadena de caracteres'
    })
    @MinLength(1,{
        message: 'El nombre debe tener al menos un caracter'
    })
    nombre: string;
    
    @IsInt()
    usuario: number;
}