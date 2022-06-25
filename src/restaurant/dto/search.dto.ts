import { ApiProperty } from "@nestjs/swagger";

export class SearchDto {
    @ApiProperty({
        description: 'Please enter the search key e.g: 024 Grille '
    })
    search: string
}
