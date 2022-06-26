import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Double } from "typeorm"

export class FilterRestaurantMenu {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Write how many restaurant you want to see in the list'
    })
    restaurant_count: Number

    @IsNotEmpty()
    @ApiProperty({
        description: 'Write by how many dishes you want to sort by'
    })
    dishes_count: number

    @IsNotEmpty()
    @ApiProperty({
        type: 'enum',
        enum: ['more', 'less']
    })
    sort: string
    @IsNotEmpty()
    @ApiProperty({
        description: 'Please Enter the starting price e.g 10.44'
    })
    start_price: string
    
    @IsNotEmpty()
    @ApiProperty({
        description: 'Please Enter the ending price e.g 12.11'
    })
    end_price: string
}
