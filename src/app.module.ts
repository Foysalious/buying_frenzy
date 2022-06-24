import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UsersModule } from './users/users.module';
import dbConfig from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig()), RestaurantModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
