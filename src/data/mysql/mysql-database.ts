import { DataSource } from "typeorm";
import { Cliente, Usuario, Campania, Mensaje } from "./entities/";
import { envs } from "@/config/envs";



const AppDataSource = new DataSource({
  type: "mysql",
  host: envs.MYSQL_HOST,
  port: +envs.MYSQL_PORT,
  username: envs.MYSQL_USER,
  password: envs.MYSQL_PASSWORD,
  database: envs.MYSQL_DATABASE,
  entities: [Cliente, Usuario, Campania, Mensaje],
  synchronize: true,
  logging: true
});



export { AppDataSource };

