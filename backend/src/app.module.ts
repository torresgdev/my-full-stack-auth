import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { LogLevel } from 'typeorm'
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingListItem } from './shopping-list/shopping-list-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');

        const commonOptions = {
          autoLoadEntities: true,
          entities: [User, ShoppingListItem], 
          synchronize: false, 
          logging: ['error'] as LogLevel[], 
        };

  
        const sslOptions = {
          ssl: {
            rejectUnauthorized: false, 
          },
        };

        if (dbUrl) {
         
          return {
            type: 'postgres',
            url: dbUrl,      
            ...commonOptions, 
            synchronize: false,
            ...sslOptions,    
          };
        } else {
        
          return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST', 'db'),
            port: configService.get<number>('DB_PORT', 5432),
            username: configService.get<string>('DB_USERNAME', 'user'),
            password: configService.get<string>('DB_PASSWORD', 'password'),
            database: configService.get<string>('DB_DATABASE', 'auth_db'),
            ...commonOptions, 
            synchronize: true,
            logging: ['query', 'error'], 
            ssl: false, 
          };
        }
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ShoppingListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
