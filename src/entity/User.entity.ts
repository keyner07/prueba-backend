import { Entity, Column, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from '../config';
import {DealerEntity, ContentAbstractEntity} from ".";


/**
 * Class User
 */
@Entity()
export class User extends ContentAbstractEntity {

    @Column()
    name!: string;

    @Column()
    age!: number;

    @Column({ length: 150, unique: true })
    email!: string;

    @Column()
    password!: string;

    @OneToOne(() => DealerEntity)
    @JoinColumn()
    dealer!: DealerEntity;

    constructor(user: Partial<User>) {
        super(user);
        Object.assign(this, user);
    }

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const saltPwd = await bcrypt.genSalt(Config.SALT);
        this.password = await bcrypt.hash(this.password, saltPwd);
    }

    async checkIfPasswordMatch(unencryptedPassword: string): Promise<boolean> {
        return await bcrypt.compare(unencryptedPassword, this.password);
    }

    async generateToken(): Promise<string> {
        const { id } = this;
        const role = 'User';
        return jwt.sign({ id, role }, Config.JWTSECRET, {
            expiresIn: '1h',
        });
    }
}