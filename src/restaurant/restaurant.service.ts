import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetRestaurantDto } from './dto/get-restaurant.dto';
import { MenuRepository } from './repository/menu.repository';
import { RestaurantRepository } from './repository/restaurant.repository';
import { TimingRepository } from './repository/timing.repository';
const fs = require("fs");
import * as mongodb from "mongodb";
import { FilterRestaurantMenu } from './dto/filter-restaurant-menu.dto';
import { SearchDto } from './dto/search.dto';

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

  async getMenuWiseRestaurants(filterRestaurantMenu: FilterRestaurantMenu) {
    if (filterRestaurantMenu.sort == 'more') {
      const restaurants = await this.restaurantRepository.find({
        where: {
          menuCount: { $gt: Number(filterRestaurantMenu.dishes_count) }
        }, select: ['_id']
      })
      return restaurants
    }

    else {
      const restaurants = await this.restaurantRepository.find({
        where: {
          menuCount: { $lt: Number(filterRestaurantMenu.dishes_count) }
        }, select: ['_id']
      })
      return restaurants
    }
  }

  async getPriceWiseRestaurant(filterRestaurantMenu: FilterRestaurantMenu) {
    const restaurants = await this.getMenuWiseRestaurants(filterRestaurantMenu)
    const restaurantIds = []
    for (let i = 0; i < restaurants.length; i++)  restaurantIds.push(new mongodb.ObjectId(restaurants[i]._id));

    var menus = await this.menuRepository.find({
      where: {
        price: { $gte: parseFloat(filterRestaurantMenu.start_price), $lte: parseFloat(filterRestaurantMenu.end_price) },
        $or: [{ id: { $in: restaurantIds } }]
      }, select: ['id', 'price']
    })
    const restaurantIdsFromMenu = []
    for (let i = 0; i < menus.length; i++) {
      restaurantIdsFromMenu.push(new mongodb.ObjectId(menus[i].id))
    };
    const restaurantFromMenu = await this.restaurantRepository.find({ where: { $or: [{ _id: { $in: restaurantIdsFromMenu } }] } })
    const sortedName = restaurantFromMenu.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName))
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