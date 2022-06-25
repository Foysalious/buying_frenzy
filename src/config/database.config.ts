import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
require('dotenv').config()

export default registerAs(
  'typeOrmConfig',
  (): TypeOrmModuleOptions => ({
    type: 'mongodb',
    url: process.env.MONGO_DSN??'mongodb+srv://test:test@cluster0.7bupr.mongodb.net/restaurant',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
  }),
);
