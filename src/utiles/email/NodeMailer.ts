import nodemailer from "nodemailer";
import { InternalServerError } from "../../core/ErrorHandler/DatabaseConectionError";
import OperationResult from "../../core/Operation/OperationResult";
import { Locales } from "../../i18n/i18n-types";
import { Translate } from "../locals/Locals";

export class NodeMailer {

    private static transporter: any;

    constructor() {

    }

    static Config(): void {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hearverse.foundation@gmail.com',
                pass:  'wktoqtuzcxljxxvp'
            }
        });
    }

    static async sendActivationCodeEmail(lang: Locales, to: string, name: string, text: string): Promise<OperationResult<any>> {

        return new Promise((resolve, reject) => {
            const activationLink = `http://localhost:4200/account/auth/confirm-mail/?email=${to}&hash=${text}`

            return this.transporter.sendMail({
                to: to,
                subject: Translate.translate[lang].EmailConfigurationSubject(),
                text: text,
                html: `<h1>${Translate.translate[lang].EmailConfigurationTitle()}</h1>
                <h2>${Translate.translate[lang].HI({ name: name })}</h2>
                <p>${Translate.translate[lang].EmailConfigurationDescription()}</p>
                <a href=${activationLink}> ${Translate.translate[lang].ClickHere()}</a>
                </div>`
            }, function (error: any, info: any) {
                if (error) {
                    reject(OperationResult.BuildFailur(error.message));
                } else {
                    resolve(OperationResult.BuildSuccessResult("", true));

                }
            });
        });

    }

    static sendTwofactorCode(to: string, subject: string, name: string, code: string): Promise<OperationResult<any>> {

        return this.transporter.sendMail({
            to: to,
            subject: subject,
            html: `<h1>Twofactor Code</h1>
            <h2>Hello ${name}</h2>
            <p>This is your twofactor Code for Login in CPAY Website </p>
            <h1>${code}</h1>
            <p>This code Will be Expire in 2 Minutes </p>
            </div>`
        }, function (error: any, info: any) {
            if (error) {
                return new OperationResult<any>(false, error);
            } else {
                return new OperationResult<any>(true, "Email Sent");

            }
        });
    }

    static ForgetPassword(to: string, subject: string, name: string, code: string): Promise<OperationResult<any>> {
        return this.transporter.sendMail({
            to: to,
            subject: subject,
            html: `<h1>Forget Password Code</h1>
            <h2>Hello ${name}</h2>
            <p>This is your Forget Password Code for Login in CPAY Website </p>
            <h1>${code}</h1>
            <p>This code Will be Expire in 2 Minutes </p>
            </div>`
        }, function (error: any, info: any) {
            if (error) {
                return new OperationResult<any>(false, error);
            } else {
                return new OperationResult<any>(true, "Email Sent");

            }
        });
    }


    static async sendEmail(to: string, subject: string, data: any): Promise<OperationResult<any>> {

        return new Promise((resolve, reject) => {

            return this.transporter.sendMail({
                to: to,
                subject: subject,
                html: data
            }, function (error: any, info: any) {
                if (error) {
                    reject(OperationResult.BuildFailur(error.message));
                } else {
                    resolve(OperationResult.BuildSuccessResult("Email Sent", true));

                }
            });
        });

    }


}