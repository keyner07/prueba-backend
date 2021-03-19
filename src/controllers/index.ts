import { Request, Response, NextFunction } from 'express';
import { DealerEntity, EntityRepository, UserEntity } from '../entity';
import { General } from '../utils';

export default class IndexController {

    /**
     * Controller for create User with Dealer
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns 
     */
    static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, age, dealer, password, addressDealer } = req.body;
            if (!(name && email && age && dealer && password && addressDealer)) {
                next(new General(400, 'Missing parameters'));
                return;
            }
            const dealerRepository: EntityRepository<DealerEntity> = new EntityRepository<DealerEntity>(
                DealerEntity,
            );
            const dealerSave: DealerEntity = new DealerEntity({
                name: dealer,
                address: addressDealer,
            });
            await dealerRepository.create(dealerSave);

            const userRespository: EntityRepository<UserEntity> = new EntityRepository<UserEntity>(
                UserEntity,
            );
            const user: UserEntity = new UserEntity({
                name,
                email,
                password,
                age,
                dealer: dealerSave,
            });
            await userRespository.create(user);
            res.status(201).json({ message: 'User created.' });
        } catch (err) {
            next(new General(500, err));
        }
    }


}
