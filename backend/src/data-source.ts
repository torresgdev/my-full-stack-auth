import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { ShoppingListItem } from './shopping-list/shopping-list-item.entity';

const isProduction = process.env.NODE_ENV === 'production';


const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
const DB_USERNAME = process.env.DB_USERNAME || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_DATABASE = process.env.DB_DATABASE || 'auth_db';
const DATABASE_URL = process.env.DATABASE_URL; 

let finalDataSourceOptions: DataSourceOptions; 

if (isProduction && DATABASE_URL) {
 
  finalDataSourceOptions = {
    type: 'postgres',
    url: DATABASE_URL, 
    synchronize: false,
    entities: [User, ShoppingListItem],
    migrations: [__dirname + '/database/migrations/*.{ts,js}'],
    ssl: { rejectUnauthorized: false }, 
    logging: ['error'],
  };
} else {
  
  finalDataSourceOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: false,
    entities: [User, ShoppingListItem],
    migrations: [__dirname + '/database/migrations/*.{ts,js}'],
    ssl: false,
    logging: ['error'],
  };
}

export const AppDataSource = new DataSource(finalDataSourceOptions);