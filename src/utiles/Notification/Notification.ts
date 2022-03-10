import OperationResult from "../../core/Operation/OperationResult";
import UnitOfWork from "../../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { SendNotificationType } from "../../DTO/UserSetting/notification-type.setting";
import { NotifiyResult } from "./model/notify-result";
import { SendNotificationEmail } from "./NotificationSender/NotificationTypes/SendEmailNotification";
import { SendNotificationSms } from "./NotificationSender/NotificationTypes/SendSmsNotification";
import { NotifySubject } from "./NotificationSender/Pattern/Notify-Subject";


export class CpayNotification {

    static subject: NotifySubject;

    static emailObserve: SendNotificationEmail;
    static smsObserve: any;

    constructor() {
    }

    static Initial(): void {

        this.subject = new NotifySubject();


        this.emailObserve = new SendNotificationEmail();
        this.smsObserve = new SendNotificationSms();

        this.subject.attach(this.emailObserve);
        this.subject.attach(this.smsObserve);

    }

    static async send(userId: string, data: any, subject: string): Promise<OperationResult<string>> {

        let notifyResult = {} as OperationResult<NotifiyResult>;

        const userSetting = await UnitOfWork.UserSettingRepository
            .getNotificationSetting(userId);

        if (userSetting.success) {

            switch (userSetting.result) {
                case SendNotificationType.EMAIL:

                    notifyResult = await this.subject.notify(userId, {
                        data: data,
                        subject: subject
                    }, this.emailObserve);
                    break;
                case SendNotificationType.SMS:

                    notifyResult = await this.subject.notify(userId, {
                        data: data,
                        subject: subject
                    }, this.smsObserve);
                    break;
                case SendNotificationType.SMS_EMAIL:
                    break;

                default:
                    break;

            }

        }

        if (notifyResult.success && notifyResult.result) {
            return OperationResult
                .BuildSuccessResult(notifyResult.message, notifyResult.result.message);
        }
        return OperationResult.BuildFailur(notifyResult.message);


    }


}