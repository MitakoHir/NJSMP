import { Sequelize, Error } from 'sequelize';
import { Logger } from '@overnightjs/logger';
import * as dotenv from 'dotenv';

dotenv.config();

class Database {
    private host = process.env.DB_HOST;
    private database = process.env.DB_NAME;
    private username = process.env.DB_USER;
    private password = process.env.DB_PASSWORD;
    private readonly sequelizeInst: Sequelize;

    constructor() {
        this.sequelizeInst = new Sequelize(this.database, this.username, this.password, {
            host: this.host,
            dialect: 'postgres',
            logging: false,
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
