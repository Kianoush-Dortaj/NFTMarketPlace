import express from 'express';
import { DatabaseType } from './Configs/DatabaseWrapper/DataBaseType';
import DatabaseWrapper from './Configs/DatabaseWrapper/DatabaseWrapper';
import cros from 'cors';
import { Translate } from './utiles/locals/Locals';
import handleError from './middleware/HandlerError';
import { WinstonLogger } from './utiles/logger/winston/WinstonLogger';
import { InternalServerError } from './core/ErrorHandler/DatabaseConectionError';
import RedisManager from './utiles/Redis/RedisRepository';
import { NodeMailer } from './utiles/email/NodeMailer';
import UnitOfWork from './DataLayer/Repository/UnitOfWork/UnitOfWork';
import { Utiles } from './utiles/utiles';
import router from './router/Router';
import { ContractConfig } from './utiles/contract/contract-config';

export default new class Startup {


    app = express();

    constructor() {

        ContractConfig.Initial();
        Translate.InitialConfig();
        WinstonLogger.Config();
        this.CreateServer();
        NodeMailer.Config();
        this.ConfigMidllware();
        this.ConfigDatabase();

    }

    /**
     * Run Server
     */
    CreateServer(): void {

        this.app.listen(1348, () => {
            console.log(`Cpay is listening on port ${1348}`);
        });

    }
    /**
     * Config Midllware
     */
    ConfigMidllware(): void {

        const corsOptions = {
            origin: ['https://adminpay.vercel.app', 'http://localhost:3000' , 'http://localhost:4200'],
            optionsSuccessStatus: 200
        };

        this.app.use(express.json());
        this.app.use(cros(corsOptions));
        this.app.use( router);

        this.app.use(handleError);

    }
    /**
     * Config Database
     */
    ConfigDatabase(): void {
        DatabaseWrapper.connect(DatabaseType.MongoDBRegular);
        RedisManager.Connet();
    }

}

