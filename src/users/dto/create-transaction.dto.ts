import { ApiProperty } from "@nestjs/swagger"

export class CreateTransactionDto {
    @ApiProperty({
        description: 'Please Provide The Menu Id e.g : 62b5ee98c1bde141807bf262 '
     })
    user_id: Number
    @ApiProperty({
       description: 'Please Provide The Menu Id e.g : 62b5ee98c1bde141807bf262 '
    })
    menu_id: string
}
