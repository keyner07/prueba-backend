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
/**
 * Class entity repository with method for manipulate the db
 */
export class EntityRepository<T> {
    private entity: Repository<T>;

    /**
     * Constructor of EntityRepository
     * @param {EntityTarget<T>} entity Given entity class.
     */
    constructor(entity: EntityTarget<T>) {
        this.entity = getRepository(entity);
    }

    /**
     * Saves a given entity in the database.
     * @param {T} criteria Given criteria to save.
     * @returns {Promise<T>}
     */
    async create(criteria: T): Promise<T> {
        return await this.entity.save(criteria);
    }

    /**
     * Finds first entity that matches given conditions.
     * @param {T} criteria Given criteria to findOne.
     * @param {FindOneOptions<T>} options criteria to find specific entity.
     * @returns {Promise<T | undefined>}
     */
    async findOne(criteria: T, options?: FindOneOptions<T>): Promise<T | undefined> {
        return await this.entity.findOne(criteria, options);
    }

    /**
     * Finds entities that match given options.
     * @param {FindManyOptions<T>} options Criteria to find specific entities.
     * @returns {Promise<T[] | undefined>}
     */
    async find(options?: FindManyOptions<T>): Promise<T[] | undefined> {
        return await this.entity.find(options);
    }

    /**
     * Updates entity partially that matches given conditions.
     * @param {FindConditions<T> | number} criteria Given criteria for find.
     * @param {QueryDeepPartialEntity<T>} partialEntity
     * @returns {Promise<UpdateResult>}
     */
    async update(
        criteria: FindConditions<T> | number,
        partialEntity: QueryDeepPartialEntity<T>,
    ): Promise<UpdateResult> {
        return await this.entity.update(criteria, partialEntity);
    }
}
