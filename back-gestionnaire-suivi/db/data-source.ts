import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'host.docker.internal',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;