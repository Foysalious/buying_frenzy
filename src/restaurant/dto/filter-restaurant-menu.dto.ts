import { Double } from "typeorm"

export class FilterRestaurantMenu {
    restaurant_count: Number
    dishes_count: number
    sort: string
    start_price:string
    end_price:string
}
