import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity('restaurant')
export class Restaurant extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @Index()
    cashBalance: string;

    @Column()
    @Index()
    restaurantName: string;

    @Column()
    @Index()
    menuCount: Number
    
}
