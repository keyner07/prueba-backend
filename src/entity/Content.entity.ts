import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Abstract class Content
 */
export abstract class Content {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column('boolean', { default: true, select: false })
    isActive!: boolean;

    @CreateDateColumn({ select: false })
    createdAt!: Date;

    constructor(content?: Partial<Content>) {
        Object.assign(this, content);
    }
}
