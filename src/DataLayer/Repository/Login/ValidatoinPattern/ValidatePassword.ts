import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";
import bcrypte from 'bcrypt';
import { Translate } from "../../../../utiles/locals/Locals";
import { Locales } from "../../../../i18n/i18n-types";

export class ValidatePassword extends Handler {

    private password: string;
    constructor(password: string) {
        super();
        this.password = password;
    }

    async handle(lang: Locales,request: IUserDoc): Promise<ValidationContext> {

        if (bcrypte.compareSync(this.password, request.password)) {
       
            return super.handle(lang,request);
       
        } else {
            if (request.accountFail < 5) {
                request.accountFail++;
            } else {
                request.locked = true;
                request.lockedDate = new Date(new Date().setUTCHours(72));
            }
            request.save();
            return {
                Context: {
                    hash: '',
                    isTowfactor: false,
                    isGoogle2FA:false,
                    token: ''
                },
                HaveError: true,
                Message: Translate.translate[lang].UsernameOrPAsswordNotValid()
            }
        }
    }

}