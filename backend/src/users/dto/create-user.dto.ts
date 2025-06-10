import { IsEmail, MinLength, IsString, isEmail } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    
    @MinLength(6)
    password: string;
}