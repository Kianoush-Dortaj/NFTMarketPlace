import { DatabaseType } from "./DataBaseType";
import { ICloud } from "./ICloud";
import { IRegular } from "./IReular";

// abstract
export interface IDatabase {
    RegularConnect(): IRegular;
    CloudConnect(): ICloud;
}