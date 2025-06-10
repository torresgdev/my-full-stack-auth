import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    email: string
    password: string;
}