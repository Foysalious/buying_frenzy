import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('users')
  addDataFromJson() {
    return this.usersService.addDataFromJson();
  }

  @Post('purchase')
  postTransaction(@Body() createTransactionDto: CreateTransactionDto) {
     this.usersService.postTransaction(createTransactionDto);
     return {message:"Successful"}
  }

}
