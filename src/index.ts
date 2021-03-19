import express, { Application } from 'express';
import Database from './db';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';
import passport from 'passport';

import {errorMiddleware} from './middlewares';
import generalRoutes from './routes';
import passportMiddleware from './middlewares/passport.middleware';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.db();
        this.plugins();
        this.routes();
        this.errors();
    }

    protected plugins(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        passport.use(passportMiddleware);
    }

    private async db(): Promise<void> {
        await Database.establishConnection();
    }

    protected routes():void {
        this.app.use('/api', generalRoutes);
    }

    protected errors(): void {
        this.app.use(errorMiddleware);
    }
}

export default new App().app;