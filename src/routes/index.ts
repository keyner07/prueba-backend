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
         * POST [/api/create] Route for create user and dealer.
         */
        this.router.post('/create', IndexController.createUser);
    }
}

export default new IndexRoutes().router;
