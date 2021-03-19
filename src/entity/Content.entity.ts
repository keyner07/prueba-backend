import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Abstract class Content
 */
export abstract class Content {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column('boolean', { default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    constructor(content?: Partial<Content>) {
        Object.assign(this, content);
    }
}
