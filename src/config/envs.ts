import dotenv from 'dotenv';
import { get } from 'env-var';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})


export const envs = {

  MYSQL_ROOT_PASSWORD: get('MYSQL_ROOT_PASSWORD').required().asString(),
  MYSQL_DATABASE: get('MYSQL_DATABASE').required().asString(),
  MYSQL_USER: get('MYSQL_USER').required().asString(),
  MYSQL_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
  MYSQL_HOST:get('MYSQL_HOST').required().asString(),
  MYSQL_PORT: get('MYSQL_PORT').required().asPortNumber()
}



