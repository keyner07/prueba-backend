import express, { Application } from 'express';
import Database from './db';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.db();
        this.plugins();
    }

    protected plugins(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
    }

    private async db(): Promise<void> {
        await Database.establishConnection();
    }
}

export default new App().app;