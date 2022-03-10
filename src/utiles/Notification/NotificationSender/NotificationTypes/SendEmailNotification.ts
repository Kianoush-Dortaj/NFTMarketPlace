import OperationResult from "../../../../core/Operation/OperationResult";
import UnitOfWork from "../../../../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { NodeMailer } from "../../../email/NodeMailer";
import { UpdateNotificationObserverModel } from "../../model/update-notification";
import { IObserver } from "../Pattern/IObserver";
import { ISubject } from "../Pattern/ISubject";


export class SendNotificationEmail implements IObserver {


    async update(userId: string, item?: UpdateNotificationObserverModel): Promise<OperationResult<string>> {

        if (item) {

            const userInfo = await UnitOfWork.userRepository.FindUserById(userId);

            if (userInfo.success && userInfo.result) {
                const sendEmail = await NodeMailer.sendEmail(userInfo.result.email, item.subject, item.data);
                
                if (sendEmail.success) {
                    return OperationResult.BuildSuccessResult("Success Send Email", sendEmail.message);
                }
                return OperationResult.BuildFailur(sendEmail.message);
            }
            return OperationResult.BuildFailur(userInfo.message);
        }
        return OperationResult.BuildFailur("Your input data has Problem");


    }


}