import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { TransactionRepository } from './tranaction.repository';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { MenuRepository } from 'src/restaurant/repository/menu.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository,TransactionRepository,RestaurantRepository,MenuRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
