import { ICloud } from './ICloud';

export default class SQLServerCloud implements ICloud {


    connect(): void {

        console.log('connect to SQL Server Cloud')
    }


}