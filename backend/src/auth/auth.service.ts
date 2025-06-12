import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async register(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (existingUser) {
            throw new BadRequestException('Este e-mail já está em uso.');
    }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const newUser = this.userRepository.create({
        email: createUserDto.email,
        password: hashedPassword, 
    });
         const user = await this.userRepository.save(newUser);
         const { password, ...result } = user; 
        return result;
    }

    async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string; user: { id: string; email: string } }> {

        const user = await this.userRepository.findOne({ where: { email: loginUserDto.email } });


        if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {

        throw new UnauthorizedException('Credenciais inválidas.');
        }
    
        const payload = { email: user.email, id: user.id };

    
        const accessToken = this.jwtService.sign(payload); 

        return {
        accessToken: accessToken, 
        user: { id: user.id, email: user.email }, 
        };
  }

    async validateUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
