import {
    EntityTarget,
    FindConditions,
    FindManyOptions,
    FindOneOptions,
    getRepository,
    Repository,
    UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class EntityRepository<T> {
    private entity: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.entity = getRepository(entity);
    }

    async create(criteria: T): Promise<T> {
        return await this.entity.save(criteria);
    }

    async findOne(criteria: T, options?: FindOneOptions<T>): Promise<T | undefined> {
        return await this.entity.findOne(criteria, options);
    }

    async find(options?: FindManyOptions<T>): Promise<T[] | undefined> {
        return await this.entity.find(options);
    }

    async update(
        criteria: FindConditions<T> | number,
        partialEntity: QueryDeepPartialEntity<T>,
    ): Promise<UpdateResult> {
        return await this.entity.update(criteria, partialEntity);
    }
}
