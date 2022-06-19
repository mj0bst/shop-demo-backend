import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });
import { Dialect, Sequelize } from "sequelize";

const dbHost = process.env.DB_HOST,
  dbPort = parseInt(process.env.DB_PORT),
  dbUser = process.env.DB_USER,
  dbPassword = process.env.DB_PASSWORD,
  dbName = process.env.DB_NAME,
  dbDialect = process.env.DB_DIALECT,
  dbPool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  };

const sequelize: Sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect as Dialect,
  pool: dbPool,
});

export default sequelize;
