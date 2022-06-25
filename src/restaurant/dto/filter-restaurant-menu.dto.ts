import { ApiProperty } from "@nestjs/swagger"
import { Double } from "typeorm"

export class FilterRestaurantMenu {
    @ApiProperty({
        description: 'Write how many restaurant you want to see in the list'
    })
    restaurant_count: Number
    @ApiProperty({
        description: 'Write by how many dishes you want to sort by'
    })
    dishes_count: number
    @ApiProperty({
        type: 'enum',
        enum: ['more', 'less']
    })
    sort: string
    @ApiProperty({
        description: 'Please Enter the starting price e.g 10.44'
    })
    start_price: string
    @ApiProperty({
        description: 'Please Enter the ending price e.g 12.11'
    })
    end_price: string
}
