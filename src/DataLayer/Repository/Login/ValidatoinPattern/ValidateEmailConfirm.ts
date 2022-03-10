import { Locales } from "../../../../i18n/i18n-types";
import { Translate } from "../../../../utiles/locals/Locals";
import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";

export class ValidateEmailConfrim extends Handler {

    async handle(lang: Locales,request: IUserDoc): Promise<ValidationContext> {
      
        if (request.confirmEmail) {
            return super.handle(lang,request);
        }
        return {
            Context: {
                hash: '',
                isTowfactor: false,
                isGoogle2FA:false,
                token: ''
            },
            HaveError:true,
            Message: Translate.translate[lang].EmailNotConfirmed()
        }

    }

}