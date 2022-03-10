import OperationResult from "../../../../core/Operation/OperationResult";
import UnitOfWork from "../../../../DataLayer/Repository/UnitOfWork/UnitOfWork";
import Sms from "../../../SMS/Sms";
import { UpdateNotificationObserverModel } from "../../model/update-notification";
import { IObserver } from "../Pattern/IObserver";


export class SendNotificationSms implements IObserver {


    async update(userId: string, item?: UpdateNotificationObserverModel): Promise<OperationResult<string>> {

        if (item) {

            const userInfo = await UnitOfWork.userRepository.FindUserById(userId);

            if (userInfo.success && userInfo.result) {

                const sendEmail = await Sms.sendMessage(item.subject, userInfo.result.phoneNumber, item.data);

                if (sendEmail.success) {
                    return OperationResult.BuildSuccessResult("Success Send SMS", sendEmail.message);
                }
                return OperationResult.BuildFailur(sendEmail.message);
            }
            return OperationResult.BuildFailur(userInfo.message);
        }
        return OperationResult.BuildFailur("Your input data has Problem");


    }


}