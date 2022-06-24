import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { RestaurantService } from '../restaurant.service';

import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Response, Request } from 'express';
import { GetRestaurantDto } from './dto/get-restaurant.dto';
import { FilterRestaurantMenu } from './dto/filter-restaurant-menu.dto';
import { SearchDto } from './dto/search.dto';

@Controller('api/v1')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post('restaurant')
  addDataFromJson() {
    return this.restaurantService.addDataFromJson();
  }

  @Get('restaurants')
  getAllRestaurant(@Body() getRestaurantDto:GetRestaurantDto) {
    return this.restaurantService.findAll(getRestaurantDto);
  }

  @Get('restaurants-sort')
  getPriceWiseRestaurant(@Body() filterRestaurantMenu:FilterRestaurantMenu) {
    return this.restaurantService.getPriceWiseRestaurant(filterRestaurantMenu);
  }

  @Get('search')
  searchRestauratDish(@Body() searchDto:SearchDto) {
    return this.restaurantService.searchRestauratDish(searchDto);
  }
}
