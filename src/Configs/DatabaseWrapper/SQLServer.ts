import { ICloud } from './ICloud';
import { IDatabase } from './IDatabase';
import { IRegular } from './IReular';
import SQLServerCloud from './SQLServerCloud';
import SQLSErverRegular from './SQLServerRegular';

export default class SQLSserver implements IDatabase {

    RegularConnect(): IRegular {
        return new SQLSErverRegular();
    }

    CloudConnect(): ICloud {
        return new SQLServerCloud();
    }

}