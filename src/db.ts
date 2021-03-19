import { Connection, createConnection, getConnection, getConnectionManager } from "typeorm";
import {createData} from './seeders';

class Database {
    private connection!: Connection;

    public async establishConnection(): Promise<void> {
        if(!getConnectionManager().has('default')) {
            this.connection = await createConnection();
            await this.connection.synchronize();
            await createData(this.connection);
            // this.connection.createQueryRunner();
        }
        else {
            this.connection = getConnection();
        }
    }
}

export default new Database();