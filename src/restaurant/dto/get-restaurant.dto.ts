import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class GetRestaurantDto {
    @IsNotEmpty()
    @ApiProperty({
        type: 'enum',
        enum: ['Sat', 'Sun', 'Mon', 'Tues', 'Weds', 'Thurs','Fri']
    })
    day: string
    
    @IsNotEmpty()
    @ApiProperty({
        description: 'Use String Format like 10:15 am or 10 am'
      })
    time: string
}
