import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findOne({where: {email: createUserDto.email } });
        if(existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const newUser = this.usersRepository.create(createUserDto)

        return this.usersRepository.save(newUser);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({where: {email}})
    }

    async findOneById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({where: {id}});
        if(!user) {
            throw new NotFoundException(`User with ID "${id}" not found.`)
        }
        return user;
    }
}
