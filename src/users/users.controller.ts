import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  // This method was created to transfer the data from json
  @Post('migrate-users-data')
  addDataFromJson() {
    return this.usersService.addDataFromJson();
  }

  @Post('purchase')
  @UsePipes(new ValidationPipe({ transform: true }))
  postTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.usersService.postTransaction(createTransactionDto);
  }
}
