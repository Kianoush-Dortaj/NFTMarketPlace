import mongoose from 'mongoose';
import { InternalServerError } from '../../core/ErrorHandler/DatabaseConectionError';
import { WinstonLogger } from '../../utiles/logger/winston/WinstonLogger';
import { IRegular } from './IReular';
import config from './../index';
// product
export default class MongooDbRegular implements IRegular {

    dataBaseConnection: mongoose.Connection | undefined;

    connect(): void {
        
        mongoose.connect(config.dbconfig.DatabaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            authSource: 'admin'
        }, () => {
            console.log('Connecto mongo')

            WinstonLogger.logger.info("Connecto To Databse");
        })

        this.dataBaseConnection = mongoose.connection;

        this.dataBaseConnection.on("error", err => {
            console.log('error mongo')
            throw new InternalServerError(err.message);
        })

    }


}