import { ApiProperty } from "@nestjs/swagger"

export class CreateTransactionDto {
    @ApiProperty({
        deprecated: true,
        description: 'Please Provide The User Id e.g : 0'
    })
    user_id: Number
    @ApiProperty({
        deprecated: true,
        description: 'Please Provide The Menu Id e.g : 62b5ee98c1bde141807bf262 '
    })
    menu_id: string
}
