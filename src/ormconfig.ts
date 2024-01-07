import {ConnectionOptions} from "typeorm";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "node_project",
  synchronize: true,
  autoReconnect: true,
  reconnectInterval: 2000,
  entities: [
    `src/entity/**/*.${isCompiled ? "js" : "ts"}`
  ],
  migrations: [
    `src/migration/**/*.${isCompiled ? "js" : "ts"}`
  ],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
  },
} as ConnectionOptions;
