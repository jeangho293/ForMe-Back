import { DataSource } from 'typeorm';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from './env';

export const mysqlConnect = new DataSource({
  type: 'mysql',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: ['dist/entities/*.js'],
  synchronize: true,
  logging: false,
});
