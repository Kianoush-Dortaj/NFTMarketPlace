import mongoose from 'mongoose';
import { IRegular } from './IReular';
// product
export default class SQLSErverRegular implements IRegular {
    dataBaseConnection: mongoose.Connection | undefined;


    connect(): void {
       
        console.log('connect to SQL server regular')

    }


}