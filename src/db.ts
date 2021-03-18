import { Connection, createConnection, getConnection, getConnectionManager } from "typeorm";

class Database {
    private connection!: Connection;

    public async establishConnection(): Promise<void> {
        if(!getConnectionManager().has('default')) {
            this.connection = await createConnection();
            await this.connection.synchronize();
            this.connection.createQueryRunner();
        }
        else {
            this.connection = getConnection();
        }
    }
}

export default new Database();