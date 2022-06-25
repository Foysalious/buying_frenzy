import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuRepository } from 'src/restaurant/repository/menu.repository';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionRepository } from './repositories/tranaction.repository';
import { UserRepository } from './repositories/user.repository';
const fs = require("fs");
import * as mongodb from "mongodb";
import { Transaction } from 'typeorm';
import { Menu } from 'src/restaurant/entities/menu.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { User } from './entities/user.entity';
import { log } from 'console';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(TransactionRepository) private transactionRepository: TransactionRepository,
    @InjectRepository(RestaurantRepository) private restaurantRepository: RestaurantRepository,
    @InjectRepository(MenuRepository) private menuRepository: MenuRepository) { }
  async uploadTransaction(purchaseHistory, id) {
    for (let i = 0; i < purchaseHistory.length; i++) {
      await this.transactionRepository.save({
        dishName: purchaseHistory[i].dishName,
        restaurantName: purchaseHistory[i].restaurantName,
        transactionAmount: purchaseHistory[i].transactionAmount,
        transactionDate: purchaseHistory[i].transactionDate,
        id: id,
      })
    }
  }


  async uploadUserInfo(data: string | any[]) {
    for (let i = 0; i < data.length; i++) {
      await this.userRepository.save({
        cashBalance: data[i].cashBalance,
        id: data[i].id,
        name: data[i].name
      })
      this.uploadTransaction(data[i].purchaseHistory, data[i].id)
    }
  }


  addDataFromJson() {
    fs.readFile("./users_with_purchase_history.json", "utf8", (err, data) => {
      if (err) {
        throw new BadRequestException('Something Wrong With Reading the File')
      }
      this.uploadUserInfo(JSON.parse(data))
    });
  }


  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date) {
    return (
      [
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join('/') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  async getMenu(createTransactionDto: CreateTransactionDto) {
    const menu = await this.menuRepository.findOne({
      where: {
        _id: new mongodb.ObjectId(createTransactionDto.menu_id)
      }
    })

    return menu
  }

  async getRestaurant(menu: Menu) {
    return await this.restaurantRepository.findOne({
      where: {
        _id: new mongodb.ObjectId(menu.id)
      }
    })
  }

  async getUser(createTransactionDto: CreateTransactionDto) {
    return await this.userRepository.findOne({
      where: {
        id: Number(createTransactionDto.user_id)
      }
    })
  }

  async transaction(restaurant: Restaurant, menu: Menu, user: User, createTransactionDto: CreateTransactionDto, date: string) {
    await this.restaurantRepository.update(restaurant, { cashBalance: menu.price + restaurant.cashBalance });
    await this.userRepository.update(user, { cashBalance: user.cashBalance - menu.price });
    await this.transactionRepository.save({
      dishName: menu.dishName,
      restaurantName: restaurant.restaurantName,
      transactionAmount: menu.price,
      id: Number(createTransactionDto.user_id),
      transactionDate: date
    })
  }

  async postTransaction(createTransactionDto: CreateTransactionDto): Promise<void> {
    const menu = await this.getMenu(createTransactionDto)
    if (menu == undefined)
      throw new NotFoundException("Not Found")
    const restaurant = await this.getRestaurant(menu)
    const user = await this.getUser(createTransactionDto)
    if (user == undefined)
      throw new NotFoundException("Not Found")

    const date = this.formatDate(new Date())
    if (user.cashBalance < menu.price) {
      throw new UnauthorizedException('Do not have enough cash')
    }
    this.transaction(restaurant, menu, user, createTransactionDto, date)
  }

}
