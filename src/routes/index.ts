import { Router } from 'express';
import passport from 'passport';
import IndexController from '../controllers';

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
        this.router.get('/login', IndexController.login);
        /**
         * POST [/api/create] Route for create user and dealer.
         */
        this.router.post('/create', IndexController.createUser);
        /**
         * POST [/api/cars/create] Route for create car.
         */
        this.router.post('/cars/create', IndexController.createCar);
    }
}

export default new IndexRoutes().router;
