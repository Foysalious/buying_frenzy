import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from "typeorm";
import { GetRestaurantDto } from './restaurant/dto/get-restaurant.dto';
import { UpdateRestaurantDto } from './restaurant/dto/update-restaurant.dto';
import { MenuRepository } from './restaurant/repository/menu.repository';
import { RestaurantRepository } from './restaurant/repository/restaurant.repository';
import { TimingRepository } from './restaurant/repository/timing.repository';
const fs = require("fs");
import * as mongodb from "mongodb";
import { FilterRestaurantMenu } from './restaurant/dto/filter-restaurant-menu.dto';
import { SearchDto } from './restaurant/dto/search.dto';
import { log } from 'console';
import { merge } from 'rxjs';
@Injectable()
export class RestaurantService {
  constructor(@InjectRepository(MenuRepository) private menuRepository: MenuRepository,
    @InjectRepository(RestaurantRepository) private restaurantRepository: RestaurantRepository,
    @InjectRepository(TimingRepository) private timingRepository: TimingRepository,
  ) { }

  async uploadTiming(timing: string, id: string) {
    const updatedTimings = timing.replace(",", " /")
    const timings = updatedTimings.trim().split('/')

    for (let i = 0; i < timings.length; i++) {
      let day = ''
      let time = ''
      var teamed = timings[i].replace(" ", "")
      day = teamed.substring(0, teamed.indexOf(" "))
      time = teamed.substring(teamed.indexOf(" "), teamed.indexOf("-"))
      if (teamed.indexOf(" ") < 0) {
        const timings = updatedTimings.trim().split('/')
        day = teamed.substring(0, 3)
        var teamed = timings[i + 1].replace(" ", "")
        time = teamed.substring(teamed.indexOf(" "), teamed.indexOf("-"))
      }
      this.timingRepository.save({ id: id, day: day.trim(), time_start: time.trim() })

    }
  }
  async uploadMenu(menu: string | any[], id: string): Promise<void> {
    for (let i = 0; i < menu.length; i++) {
      await this.menuRepository.save({
        dishName: menu[i].dishName,
        price: menu[i].price,
        id: id
      })
    }
  }
  async uploadRestaurantInfo(data: any): Promise<void> {
    for (let i = 0; i < data.length; i++) {
      const restaurant = await this.restaurantRepository.save({
        cashBalance: data[i].cashBalance,
        restaurantName: data[i].restaurantName,
        menuCount: data[i].menu.length
      })
      await this.uploadMenu(data[i].menu, restaurant._id)
      await this.uploadTiming(data[i].openingHours, restaurant._id)

    }

  }
  addDataFromJson() {
    fs.readFile("./restaurant_with_menu.json", "utf8", (err, data) => {
      if (err) {
        throw new BadRequestException('Something Wrong With Reading the File')
      }
      this.uploadRestaurantInfo(JSON.parse(data))
    });
  }

  async findAll(getRestaurantDto: GetRestaurantDto) {
    const restaurantIds = await this.timingRepository.find({
      where: {
        day: getRestaurantDto.day,
        time_start: getRestaurantDto.time
      }, select: ['id']
    })
    if (restaurantIds.length == 0) {
      throw new NotFoundException('No Restaurant Found')
    }

    let restaurants = []
    for (let i = 0; i < restaurantIds.length; i++) {
      const restaurant = await this.restaurantRepository.findOne({
        where: {
          _id: new mongodb.ObjectId(restaurantIds[i].id)
        }, select: ['restaurantName']
      })
      restaurants.push(restaurant)
    }
    return restaurants
  }

  async getPriceWiseRestaurant(filterRestaurantMenu: FilterRestaurantMenu) {
    if (filterRestaurantMenu.sort == 'more') {
      var restaurants = await this.restaurantRepository.find({
        where: {
          menuCount: { $gt: Number(filterRestaurantMenu.dishes_count) }
        }, select: ['_id']
      })
    }
    else {
      var restaurants = await this.restaurantRepository.find({
        where: {
          menuCount: { $lt: Number(filterRestaurantMenu.dishes_count) }
        }, select: ['_id']
      })
    }
    const restaurantIds = []
    for (let i = 0; i < restaurants.length; i++) {
      var menus = await this.menuRepository.find({
        where: {
          id: new mongodb.ObjectId(restaurants[i]._id),
          price: { $gt: parseFloat(filterRestaurantMenu.start_price), $lt: parseFloat(filterRestaurantMenu.end_price) },
        }, select: ['id']
      })
      restaurantIds.push(menus[0])
    }
    const filtered = restaurantIds.filter(function (el) {
      return el != null;
    });
    const resturantName = []
    for (let i = 0; i < filtered.length; i++) {
      const restaurant = await this.restaurantRepository.find({
        where: {
          _id: new mongodb.ObjectId(filtered[i].id),
        }, select: ['restaurantName']
      })
      resturantName.push(restaurant[0])
    }
    const sortedName = resturantName.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName))
    return sortedName.slice(0, Number(filterRestaurantMenu.restaurant_count))
  }
  async searchRestauratDish(searchDto: SearchDto) {
    const restaurant = await this.restaurantRepository.find({
      where: {
        restaurantName: { $regex: ".*" + searchDto.search + ".*" }
      }, select: ['restaurantName']
    })


    const menu = await this.menuRepository.find({
      where: {
        dishName: { $regex: ".*" + searchDto.search + ".*" }
      }, select: ['dishName']
    })
    const merge = [...menu, ...restaurant]
    if (merge.length == 0) 
      throw new NotFoundException("No Dish Or Restaurant Found");
    return merge 
  }

}