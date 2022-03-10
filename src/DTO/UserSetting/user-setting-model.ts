import { GoogleAuthSetting } from "./google-auth.setting";
import { SendNotificationType } from "./notification-type.setting";
import { NotificationSetting } from "./notification.setting";
import { TwofactorSetting } from "./towfactor.setting";

export interface UserSettingModel {

    twofactor: TwofactorSetting;
    googleAuth: GoogleAuthSetting;
    notification: SendNotificationType;

}