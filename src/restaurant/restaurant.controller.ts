import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Query } from '@nestjs/common';
import { RestaurantService } from '../restaurant.service';
import { GetRestaurantDto } from './dto/get-restaurant.dto';
import { FilterRestaurantMenu } from './dto/filter-restaurant-menu.dto';
import { SearchDto } from './dto/search.dto';

@Controller('api/v1')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }
  //This method was created to transfer the data from json
  @Post('restaurant-data')
  addDataFromJson() {
    return this.restaurantService.addDataFromJson();
  }

  @Get('restaurants')
  getAllRestaurant(@Query() getRestaurantDto: GetRestaurantDto) {
    return this.restaurantService.findAll(getRestaurantDto);
  }

  @Get('restaurants-sort')
  getPriceWiseRestaurant(@Query() filterRestaurantMenu: FilterRestaurantMenu) {
    return this.restaurantService.getPriceWiseRestaurant(filterRestaurantMenu);
  }

  @Get('search')
  searchRestauratDish(@Query() searchDto: SearchDto) {
    return this.restaurantService.searchRestauratDish(searchDto);
  }
}
