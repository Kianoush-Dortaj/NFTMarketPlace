import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";
import { Locales } from "../../../../i18n/i18n-types";
import { Translate } from "../../../../utiles/locals/Locals";
import RedisKey from "../../../../utiles/Redis/RedisKey";
import { Utiles } from "../../../../utiles/utiles";

export class ValidateTowFactor extends Handler {

    async handle(lang: Locales,request: IUserDoc): Promise<ValidationContext> {

        if (!request.towFactorEnabled) {
            return super.handle(lang,request);
        }

        const generateHashCode = await Utiles.GerateHashCode(RedisKey.TowfactorKey + request.email);

        if (generateHashCode.success && generateHashCode.result) {
            return {
                Context: {
                    hash: generateHashCode.result?.hash,
                    isTowfactor: true,
                    isGoogle2FA: false,
                    token: ''
                },
                HaveError: false,
                Message: Translate.translate[lang].SentTowfactorCode()
            }
        }

        return {
            Context: {
                hash: '',
                isGoogle2FA: false,
                isTowfactor: false,
                token: ''
            },
            HaveError: false,
            Message: 'We have an Error in Generate your activation code . please try again for activation later'
        }



    }

}