import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @Index()
    cashBalance: bigint;

    @Column()
    @Index()
    name: string;

    @Column()
    @Index()
    id: Number;

}
