import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ContentAbstractEntity, UserEntity } from '.';

/**
 * Class Car
 */
@Entity()
export class Car extends ContentAbstractEntity {
    @Column()
    name!: string;

    @Column()
    year!: number;

    @Column()
    color!: string;

    @Column({ select: false })
    userId!: number;
    @ManyToOne(() => UserEntity, (user) => user.id, { eager: true, cascade: true })
    @JoinColumn({ name: 'userId' })
    user!: UserEntity;

    constructor(car?: Partial<Car>) {
        super(car);
        Object.assign(this, car);
    }
}
