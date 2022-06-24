import { Module } from '@nestjs/common';
import { RestaurantService } from '../restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRepository } from './repository/restaurant.repository';
import { MenuRepository } from './repository/menu.repository';
import { TimingRepository } from './repository/timing.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantRepository, TimingRepository, MenuRepository]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService]
})
export class RestaurantModule { }
