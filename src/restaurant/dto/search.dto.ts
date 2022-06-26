import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SearchDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Please enter the search key e.g: 024 Grille '
    })
    search: string
}
