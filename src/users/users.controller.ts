import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
// This method was created to transfer the data from json
  @Post('users-data')
  addDataFromJson() {
    return this.usersService.addDataFromJson();
  }

  @Post('purchase')
  postTransaction(@Body() createTransactionDto: CreateTransactionDto) {
     return this.usersService.postTransaction(createTransactionDto);
   
  }

}
