/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
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
            const id = req.user?.id;

            if (!(name && year && color)) {
                next(new General(400, 'Missing parameters.'));
                return;
            }

            const carRepo: EntityRepository<CarEntity> = new EntityRepository<CarEntity>(CarEntity);
            const car: CarEntity = new CarEntity({ name, year, color, userId: id });
            await carRepo.create(car);

            res.status(201).json({ message: 'Created car.' });
        } catch (err) {
            next(new General(500, err));
        }
    }

    static async getCarById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const carRepo: EntityRepository<CarEntity> = new EntityRepository<CarEntity>(CarEntity);
            const idCar = parseInt(id);
            const car: CarEntity | undefined = await carRepo.findOne(
                new CarEntity({ id: idCar, isActive: true }),
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
}
