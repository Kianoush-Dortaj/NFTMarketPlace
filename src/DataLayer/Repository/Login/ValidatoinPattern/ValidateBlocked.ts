import { Locales } from "../../../../i18n/i18n-types";
import { Translate } from "../../../../utiles/locals/Locals";
import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";


export class ValidateBlocked extends Handler {

    async handle(lang: Locales, request: IUserDoc): Promise<ValidationContext> {

        if (!request.locked) {

            return super.handle(lang,request);
        } else {
            if (request.lockedDate! < new Date(new Date().toUTCString())) {

                request.accountFail = 0;
                request.locked = false;
                request.lockedDate = undefined;
                request.save();
                return super.handle(lang,request);
            } else {
                return {
                    Context: {
                        hash: '',
                        isTowfactor: false,
                        isGoogle2FA: false,
                        token: ''
                    },
                    HaveError: true,
                    Message: Translate.translate[lang].BlockedAccount({ date: request.lockedDate })
                }
            }
        }

    }
}