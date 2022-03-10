
import config from './../../Configs/index';
import { Twilio } from "twilio";
import OperationResult from '../../core/Operation/OperationResult';

export default class Sms {

    static client: Twilio;

    constructor() { }

    static Initial(): void {
        this.client = new Twilio(config.smsconfig.accountSid, config.smsconfig.authToken);
    }

    static async sendMessage(subject: string, to: string , data:any): Promise<OperationResult<any>> {

        return new Promise((resolve, reject) => {

            this.client.messages.create({
                to: to,
                body: subject + data,
                from: config.smsconfig.twilioNumber
            }).then((data: any) => {
                resolve(OperationResult.BuildSuccessResult("Send Sms", true));
            })
                .catch((error: any) => {
                    reject(OperationResult.BuildFailur(error.message))
                });

        });


    }


}