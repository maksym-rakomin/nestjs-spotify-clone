import { DataSource, DataSourceOptions } from 'typeorm';
import process from 'node:process';

export const dataSourceOptions: DataSourceOptions = {
  database: 'spotify-clone',
  host: 'localhost',
  port: 5432,
  type: 'postgres',
  username: 'maksymrakomin',
  password: '1508',
  entities: ['dist/**/*.entity.js'], //1
  synchronize: false, // 2
  migrations: ['dist/db/migrations/*.js'], // 3
};
const dataSource = new DataSource(dataSourceOptions); //4
export default dataSource;
