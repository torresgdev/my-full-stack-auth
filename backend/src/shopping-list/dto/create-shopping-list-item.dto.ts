import { IsString, IsNumber, IsOptional, Min, MaxLength } from "class-validator";

export class CreateShoppinListItemDto {
    @IsString({message: 'O nome do item deve ser uma string.'})
    @MaxLength(100, {message: 'O nome do item não pode exceder 100 caracteres.'})
    name: string;

    @IsOptional()
    @IsNumber({}, {message: 'A quantidade deve ser um número.'})
    @Min(1, {message: 'A quantidade mínima é 1.'})
    quantity?: number;

    @IsOptional()
    isPurchased?: boolean
}