import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity('transaction')
export class Transaction extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @Index()
    dishName: string;

    @Column()
    @Index()
    restaurantName: string;

    @Column()
    @Index()
    transactionAmount: string;

    @Column()
    @Index()
    transactionDate: string;

    @Column()
    @Index()
    id: number;

}
