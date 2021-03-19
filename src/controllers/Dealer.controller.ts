/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import { ILike } from 'typeorm';
import { CarEntity, EntityRepository } from '../entity';
import { General } from '../utils';

export default class DealerController {
    /**
     * Controller for create car.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns
     */
    static async createCar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, year, color } = req.body;
            // @ts-ignore
            const userId = req.user?.id as number;

            if (!(name && year && color)) {
                next(new General(400, 'Missing parameters.'));
                return;
            }

            const carRepo: EntityRepository<CarEntity> = new EntityRepository<CarEntity>(CarEntity);
            const car: CarEntity = new CarEntity({ name, year, color, userId });
            await carRepo.create(car);

            res.status(201).json({ message: 'Created car.' });
        } catch (err) {
            next(new General(500, err));
        }
    }
    /**
     * Controller for get all cars.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns
     */
    static async getCars(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { search } = req.query;

            const carRepo: EntityRepository<CarEntity> = new EntityRepository<CarEntity>(CarEntity);
            const where = search
                ? [
                      { name: ILike(`%${search || ''}%`), isActive: true },
                      { color: ILike(`%${search || ''}%`) },
                  ]
                : [{ isActive: true }];
            const cars: CarEntity[] | undefined = await carRepo.find({
                select: ['id', 'name', 'year', 'color', 'user', 'createdAt'],
                relations: ['user'],
                where: where,
            });
            res.status(200).json(cars);
        } catch (err) {
            next(new General(500, err));
        }
    }
    /**
     * Controller for get car by id.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns
     */
    static async getCarById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = (req.params.id as unknown) as number;

            const carRepo: EntityRepository<CarEntity> = new EntityRepository<CarEntity>(CarEntity);
            const car: CarEntity | undefined = await carRepo.findOne(
                new CarEntity({ id, isActive: true }),
            );
            if (!car) {
                next(new General(404, 'Not found'));
                return;
            }

            res.status(200).json(car);
        } catch (err) {
            next(new General(500, err));
        }
    }

    /**
     * Controller for delete car by publisher.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns
     */
    static async deleteCar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = (req.params.id as unknown) as number;
            // @ts-ignore
            const idUser = req.user?.id as number;

            const carRepo: EntityRepository<CarEntity> = new EntityRepository<CarEntity>(CarEntity);
            const car: CarEntity | undefined = await carRepo.findOne(
                new CarEntity({ id, isActive: true }),
            );
            if (!car) {
                next(new General(404, 'Not found'));
                return;
            }
            if (idUser !== car.userId) {
                next(new General(403, 'Unauthorized'));
                return;
            }

            await carRepo.update(car.id, { isActive: false });

            res.status(200).json({ message: 'Deleted car.' });
        } catch (err) {
            next(new General(500, err));
        }
    }

    /**
     * Controller for edit car by publisher.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns
     */
    static async editCar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            // @ts-ignore
            const idUser = req.user?.id;

            const carRepo: EntityRepository<CarEntity> = new EntityRepository<CarEntity>(CarEntity);
            const idCar = parseInt(id);
            const car: CarEntity | undefined = await carRepo.findOne(
                new CarEntity({ id: idCar, isActive: true }),
            );
            if (!car) {
                next(new General(404, 'Not found'));
                return;
            }
            if (idUser !== car.userId) {
                next(new General(403, 'Unauthorized'));
                return;
            }

            const { body } = req;
            await carRepo.update(car.id, body);

            res.status(200).json({ message: 'Edited car.' });
        } catch (err) {
            next(new General(500, err));
        }
    }
}
