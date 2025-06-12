import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; 
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { JwtStrategy } from './strategies/jwt.strategy'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User } from 'src/users/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    UsersModule,
    PassportModule,
   
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '60m' }, 
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy, //
  ],
  controllers: [AuthController],
 
  exports: [AuthService, JwtModule],
})
export class AuthModule {}