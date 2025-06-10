import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor (
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(createUserDto: CreateUserDto): Promise<any> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        try {
            const user = await this.userService.create({
                email: createUserDto.email,
                password: hashedPassword,
            });

            const {password, ...result} = user;
            return result
        } catch (error) {
            if(error.code === '23505') {
                throw new BadRequestException('Email already registered.')
            }
            throw error;
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
        const user = await this.userService.findOneByEmail(loginUserDto.email)

        if(!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const payload = {email: user.email, sub: user.id}

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
