import { Sequelize, Error } from 'sequelize';
import { Logger } from '@overnightjs/logger';

class Database {
    private host = 'localhost';
    private database = 'njmp';
    private username = 'postgres';
    private password = '123456';
    private readonly sequelizeInst: Sequelize;

    constructor() {
        this.sequelizeInst = new Sequelize(this.database, this.username, this.password, {
            host: this.host,
            dialect: 'postgres',
        });
    }

    public getConnection(): Sequelize {
        return this.sequelizeInst;
    }

    public disconnect(): void {
        this.sequelizeInst.close();
    }

    public testConnection(): void {
        this.sequelizeInst.authenticate()
            .then(() => {
                Logger.Imp('Connection to the database has been established successfully.');
            })
            .catch((err: Error) => {
                Logger.Err(`Unable to connect to the database: ${err.message}`);
            });
    }
}
const database = new Database();

export default database;
