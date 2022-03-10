import { DatabaseType } from "./DataBaseType";
import MongoDB from "./MongoDB";
import mongoose from 'mongoose';
import SQLSserver from "./SQLServer";


export default class DatabaseWrapper {

    static dataBaseConnection: mongoose.Connection | undefined;

    static connect(dbType: DatabaseType): any {

        switch (dbType) {

            case DatabaseType.MongoDBRegular:
                const connectToDB = new MongoDB().RegularConnect();
                connectToDB.connect();
                this.dataBaseConnection = connectToDB.dataBaseConnection;
                break;

            case DatabaseType.MongoDBCloud:
                new MongoDB().CloudConnect().connect();
                break;

            case DatabaseType.SQLServerCloud:
                new SQLSserver().CloudConnect().connect();
                break;

            case DatabaseType.SQLServerRegular:
                new SQLSserver().RegularConnect().connect();
                break;

            default:
                new MongoDB().RegularConnect().connect();
                break;

        }


    }


}