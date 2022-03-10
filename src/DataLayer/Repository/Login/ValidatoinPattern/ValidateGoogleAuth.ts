import { IUserDoc } from "../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";
import uniqueString from 'unique-string';
import UnitOfWork from "../../UnitOfWork/UnitOfWork";
import { USER_SETTING_ENUM } from "../../../../DTO/UserSetting/user-setting-enum";
import { UserSettingAuthGoogle2FA } from "../../../../DTO/UserSetting/user-setting-register-user-role";
import { Translate } from "../../../../utiles/locals/Locals";
import { Locales } from "../../../../i18n/i18n-types";

export class ValidateGoogleAuth extends Handler {

    async handle(lang: Locales,request: IUserDoc): Promise<ValidationContext> {

        const getUserSetting = await UnitOfWork.UserSettingRepository.getGoogleAuthSetting(request.id)

        if (getUserSetting.result?.isEnable === false) {

            return super.handle(lang,request);
        }

        return {
            Context: {
                hash: '',
                isTowfactor: false,
                isGoogle2FA: true,
                token: ''
            },
            HaveError: false,
            Message: Translate.translate[lang].UserGoogleAuthnticatorForLogin()
        }
    }

}