import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { ShoppingListItem } from './shopping-list/shopping-list-item.entity';

const isProduction = process.env.NODE_ENV === 'production';

// Para evitar 'undefined', dê valores padrão se não estiver em produção ou lance um erro
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
const DB_USERNAME = process.env.DB_USERNAME || 'myauth_user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'myauth_password';
const DB_DATABASE = process.env.DB_DATABASE || 'myauth_db';
const DATABASE_URL = process.env.DATABASE_URL; // Guarde o URL para fácil acesso

let finalDataSourceOptions: DataSourceOptions; // Declare como 'let' para que possa ser reatribuída

if (isProduction && DATABASE_URL) {
  // Se estiver em produção E DATABASE_URL existe, use apenas o URL
  finalDataSourceOptions = {
    type: 'postgres',
    url: DATABASE_URL, // Use o URL da variável de ambiente
    synchronize: false,
    entities: [User, ShoppingListItem],
    migrations: [__dirname + '/database/migrations/*.{ts,js}'],
    ssl: { rejectUnauthorized: false }, // Em produção, SSL geralmente é { rejectUnauthorized: false } ou um objeto de certificado
    logging: ['error'],
  };
} else {
  // Caso contrário (não produção ou sem DATABASE_URL), use as opções detalhadas
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
    ssl: false, // Em desenvolvimento, SSL geralmente é falso
    logging: ['error'],
  };
}

export const AppDataSource = new DataSource(finalDataSourceOptions);