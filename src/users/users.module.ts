import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { TransactionRepository } from './repositories/tranaction.repository';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { MenuRepository } from 'src/restaurant/repository/menu.repository';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, TransactionRepository, RestaurantRepository, MenuRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
