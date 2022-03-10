import OperationResult from "../../../../core/Operation/OperationResult";
import { UpdateNotificationObserverModel } from "../../model/update-notification";
import { ISubject } from "./ISubject";


export interface IObserver {

    update(userId: string, item?: UpdateNotificationObserverModel): Promise<OperationResult<string>>;

}