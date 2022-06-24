import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity('timing')
export class Timing extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @Index()
    day: string;

    

    @Column()
    @Index()
    time_start: string;




    @Column()
    @Index()
    id: string;
}
