import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Double } from "typeorm"

export class FilterRestaurantMenu {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Write how many restaurant you want to see in the list e.g 10'
    })
    restaurant_count: Number

    @IsNotEmpty()
    @ApiProperty({
        description: 'Write by how many dishes you want to sort by e.g 10'
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
        description: 'Please Enter the starting price e.g 13.87'
    })
    start_price: string
    
    @IsNotEmpty()
    @ApiProperty({
        description: 'Please Enter the ending price e.g 13.88'
    })
    end_price: string
}
