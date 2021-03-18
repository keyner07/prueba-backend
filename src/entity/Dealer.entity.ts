import { Entity, Column } from 'typeorm';
import { ContentAbstractEntity } from '.';

/**
 * Class Dealer
 */
@Entity()
export class Dealer extends ContentAbstractEntity {
    @Column({ unique: true })
    name!: string;

    @Column()
    address!: string;

    constructor(dealer: Partial<Dealer>) {
        super(dealer);
        Object.assign(this, dealer);
    }
}
