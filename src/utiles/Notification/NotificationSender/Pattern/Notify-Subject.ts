import OperationResult from "../../../../core/Operation/OperationResult";
import { NotifiyResult } from "../../model/notify-result";
import { UpdateNotificationObserverModel } from "../../model/update-notification";
import { IObserver } from "./IObserver";
import { ISubject } from "./ISubject";

export class NotifySubject implements ISubject {

    private observers: IObserver[] = [];


    public attach(observer: IObserver): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        this.observers.push(observer);
    }

    public detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
    }

    public async notify(userId: string, item: UpdateNotificationObserverModel, observe: IObserver): Promise<OperationResult<NotifiyResult>> {

        const isExist = this.observers.includes(observe);
                      
        const update = await observe.update(userId, item);

        if (update.success) {
            return OperationResult.BuildSuccessResult(update.message, {
                message: update.message,
                success: update.success
            })
        }
      
        return OperationResult.BuildFailur(update.message);
    }

}