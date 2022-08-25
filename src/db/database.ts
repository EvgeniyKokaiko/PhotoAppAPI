import { Dialect } from "sequelize";
import {DATABASE_CONFIG} from "../internal/types";
const { Sequelize } = require('sequelize');
require('dotenv').config({path: require('path').join(__dirname, '/../env', '.env')})


const config: DATABASE_CONFIG = {
    dbName: process.env.DB_NAME || '',
    dialect: process.env.DB_DIALECT || '',
    host: process.env.DB_HOST || '',
    password: process.env.DB_PASSWORD || '',
    username: process.env.DB_USERNAME || '',
    port: process.env.DB_PORT || '',
}


class Database {
    private _client: typeof Sequelize;
    constructor(private config: DATABASE_CONFIG) {
        this._client = null;
    }
    public createDatabaseConnection = () => {
            try {
                if (this.client !== null) {
                    return;
                }
                    const { dialect, host, password, dbName, username, port } = this.config;
                    this._client = new Sequelize(dbName, username, password, {
                        host,
                        dialect,
                        port,
                        pool: {
                            max: 100,
                            min: 0,
                            idle: 200000,
                            acquire: 1000000,
                        },
                        logging: (sql: string, timing: number) => {
                            console.log(`OPERATION: ${sql} WAS FIRED: ${new Date().toString()}`)
                        }
                    });
                this._client.authenticate().then();
                console.log('Connection has been established successfully.');
            } catch (error) {
                console.error('Unable to connect to the database:', error);
                return null;
            }
    }

    public eclipseConnection = () => {
        if (this.client === void 0 || this.client === null) {
            this.createDatabaseConnection()
        }
        return this;
    }

    public get client(): typeof Sequelize {
        return this._client;
    }

}


module.exports = new Database(config)
