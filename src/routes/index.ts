import { Router } from 'express';
import passport from 'passport';
import { UserController, DealerController } from '../controllers';

/**
 * Class Index Routes
 */
class IndexRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        /**
         * GET [/api/login] Route for login user.
         */
        this.router.get('/login', UserController.login);
        /**
         * POST [/api/create] Route for create user and dealer.
         */
        this.router.post('/create', UserController.createUser);
        /**
         * POST [/api/cars] Route for create car.
         */
        this.router.post(
            '/cars',
            passport.authenticate('jwt', { session: false }),
            DealerController.createCar,
        );
        /**
         * GET [/api/cars/:id] Route for show car by id.
         */
        this.router.get('/cars/:id', DealerController.getCarById);
        /**
         * DELETE [/api/cars/:id] Route for delete car.
         */
        this.router.delete(
            '/cars/:id',
            passport.authenticate('jwt', { session: false }),
            DealerController.deleteCar,
        );
    }
}

export default new IndexRoutes().router;
