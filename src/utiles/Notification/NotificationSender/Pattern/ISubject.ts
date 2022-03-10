import OperationResult from "../../../../core/Operation/OperationResult";
import { NotifiyResult } from "../../model/notify-result";
import { UpdateNotificationObserverModel } from "../../model/update-notification";
import { IObserver } from "./IObserver";

export interface ISubject {

    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(userId: string,item: UpdateNotificationObserverModel, observe: IObserver): Promise<OperationResult<NotifiyResult>>;


}