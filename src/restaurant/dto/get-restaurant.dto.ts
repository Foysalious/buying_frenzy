import { ApiProperty } from "@nestjs/swagger"

export class GetRestaurantDto {
    @ApiProperty({
        type: 'enum',
        enum: ['Sat', 'Sun', 'Mon', 'Tues', 'Weds', 'Thurs','Fri']
    })
    day: string
    @ApiProperty({
        description: 'Use String Format like 10:15 am or 10 am'
      })
    time: string
}
