import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateUserDto extends PartialType(CreateTransactionDto) { }
