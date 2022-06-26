import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateTransactionDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Please Provide The Menu Id e.g : 62b5ee98c1bde141807bf262 '
     })
    user_id: Number
    
    @IsNotEmpty()
    @ApiProperty({
       description: 'Please Provide The Menu Id e.g : 62b5ee98c1bde141807bf262 '
    })
    menu_id: string
}
