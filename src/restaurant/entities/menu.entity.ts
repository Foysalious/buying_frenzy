import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity('menu')
export class Menu extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @Index()
    dishName: string;

    @Column()
    @Index()
    price: any;

    @Column()
    @Index()
    id: string;

}
