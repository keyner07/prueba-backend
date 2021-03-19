/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import { DealerEntity, EntityRepository, UserEntity } from '../entity';
import { General } from '../utils';

export default class UserController {
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

    /**
     * Controller for login user
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns
     */
    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                next(new General(400, 'Missing parameters.'));
                return;
            }

            const userRepo: EntityRepository<UserEntity> = new EntityRepository<UserEntity>(
                UserEntity,
            );
            const isActive = true;
            const userAuth: UserEntity = new UserEntity({ email, isActive });
            const user = await userRepo.findOne(userAuth, {
                select: ['name', 'id', 'email', 'password'],
            });

            if (!user) {
                return next(new General(404, 'Not found the user.'));
            }
            const match: boolean = await user.checkIfPasswordMatch(password);
            if (!match) {
                next(new General(401, 'Email or password incorrect'));
                return;
            }

            const token = await user.generateToken();

            res.status(200).json({ token, user });
        } catch (err) {
            next(new General(500, err.message));
        }
    }

    /**
     * Controller for edit user
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns
     */
     static async editUser(req: Request, res: Response, next: NextFunction): Promise<void> {
         try {
            // @ts-ignore
            const idUser = (req.user?.id as number);
            const {name, age} = req.body;
            if(!(name || age)){
                next(new General(400, 'Missing parameters.'));
                return;
            }

            const userRepo: EntityRepository<UserEntity> = new EntityRepository<UserEntity>(
                UserEntity,
            );

            const user: UserEntity = new UserEntity();
            if(name){
                user.name = name;
            }
            if(age){
                user.age = age;
            }
            await userRepo.update(idUser,user);

            res.status(200).json({ message: "Edited user."});
         }catch(err){
             next(new General(500, err));
         }
     }
}
