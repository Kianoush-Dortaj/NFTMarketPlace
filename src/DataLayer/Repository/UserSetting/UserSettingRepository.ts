import OperationResult from "../../../core/Operation/OperationResult";
import { UserSettingEntitie } from "../../Context/UserSetting/UserSetting";
import RedisManager from '../../../utiles/Redis/RedisRepository';
import { IUserSettingRepository } from "./IUserSettingRepository";
import { USER_SETTING_ENUM } from "../../../DTO/UserSetting/user-setting-enum";
import { SpeakEeasy } from './../../../utiles/Speakeasy/SpeakEasyConfig';
import { UserSettingModel } from "../../../DTO/UserSetting/user-setting-model";
import { GoogleAuthSetting } from "../../../DTO/UserSetting/google-auth.setting";
import { SendNotificationType } from "../../../DTO/UserSetting/notification-type.setting";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import { CpayNotification } from "../../../utiles/Notification/Notification";
import RedisKey from "../../../utiles/Redis/RedisKey";
import Sms from "../../../utiles/SMS/Sms";
import { Utiles } from "../../../utiles/utiles";

export default class UserSettingRepository implements IUserSettingRepository {

    async setGoogleAuthSetting(userId: string, isEnable: boolean): Promise<OperationResult<any>> {

        try {

            let setting = await UserSettingEntitie.findOne({ userId: userId });
            const tempSecret = SpeakEeasy.generate();

            if (setting) {

                const settingPars = JSON.parse(setting.value);
                settingPars.googleAuth.isEnable = isEnable;
                settingPars.googleAuth.secretKey = tempSecret;
                setting.value = JSON.stringify(settingPars);

                setting.save();

                await RedisManager.ResetSingleItem(USER_SETTING_ENUM.USER_SETTING + userId, setting.value);

                return OperationResult.BuildSuccessResult('Success Update UserSetting', tempSecret);
            }
            return OperationResult.BuildSuccessResult('We can not find setting for this user', true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async getGoogleAuthSetting(userId: string): Promise<OperationResult<GoogleAuthSetting>> {

        try {

            const getRedisSetting = await RedisManager.Get<any>(USER_SETTING_ENUM.USER_SETTING + userId);

            if (getRedisSetting.success) {
                if (getRedisSetting.result) {

                    const settingPars = JSON.parse(getRedisSetting.result) as UserSettingModel;

                    return OperationResult.BuildSuccessResult("Success Get Setting", {
                        isEnable: settingPars.googleAuth.isEnable,
                        secretKey: settingPars.googleAuth.secretKey
                    });
                }
            }

            let setting = await UserSettingEntitie.findOne({ userId: userId });

            if (setting) {

                const settingPars = JSON.parse(setting.value);

                return OperationResult.BuildSuccessResult('Success Update UserSetting', settingPars.googleAuth.isEnable);
            }
            return OperationResult.BuildFailur('We can not find setting for this user');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async setTwofactorSetting(userId: string, isEnable: boolean): Promise<OperationResult<any>> {

        try {

            let setting = await UserSettingEntitie.findOne({ userId: userId });
            const tempSecret = SpeakEeasy.generate();

            if (setting) {

                const settingPars = JSON.parse(setting.value);
                settingPars.twofactor.isEnable = isEnable;
                setting.value = JSON.stringify(settingPars);

                setting.save();

                await RedisManager.ResetSingleItem(USER_SETTING_ENUM.USER_SETTING + userId, setting.value);

                return OperationResult.BuildSuccessResult('Success Update UserSetting', tempSecret);
            }
            return OperationResult.BuildSuccessResult('We can not find setting for this user', true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async getTwofactorSetting(userId: string): Promise<OperationResult<boolean>> {

        try {

            const getRedisSetting = await RedisManager.Get<any>(USER_SETTING_ENUM.USER_SETTING + userId);

            if (getRedisSetting.success && getRedisSetting.result) {

                const settingPars = JSON.parse(getRedisSetting.result) as UserSettingModel;

                return OperationResult.BuildSuccessResult("Success Get Setting", settingPars.twofactor.isEnable);

            }

            let setting = await UserSettingEntitie.findOne({ userId: userId });

            if (setting) {

                const settingPars = JSON.parse(setting.value);

                return OperationResult.BuildSuccessResult('Success Update UserSetting', settingPars.googleAuth.isEnable);
            }
            return OperationResult.BuildFailur('We can not find setting for this user');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async setNotificationSetting(userId: string, item: SendNotificationType): Promise<OperationResult<any>> {

        try {


            let setting = await UserSettingEntitie.findOne({ userId: userId });

            if (setting) {

                let findUser = await UnitOfWork.userRepository.FindUserById(userId);

                if (findUser.success && (item == SendNotificationType.SMS || item == SendNotificationType.SMS_EMAIL) && findUser.result?.confirmPhoneNumber === false) {
                    return OperationResult.BuildFailur("you Should Confirm Phone Number and then active your notifcation with SMS");
                }

                const settingPars = JSON.parse(setting.value);
                settingPars.notification = item;
                setting.value = JSON.stringify(settingPars);
                setting.save();

                await RedisManager.ResetSingleItem(USER_SETTING_ENUM.USER_SETTING + userId, setting.value);

                return OperationResult.BuildSuccessResult('Success Update UserSetting', true);
            }
            return OperationResult.BuildSuccessResult('We can not find setting for this user', false);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async getNotificationSetting(userId: string): Promise<OperationResult<SendNotificationType>> {

        try {

            const getRedisSetting = await RedisManager.Get<any>(USER_SETTING_ENUM.USER_SETTING + userId);
            if (getRedisSetting.success && getRedisSetting.result) {

                const settingPars = JSON.parse(getRedisSetting.result) as UserSettingModel;

                return OperationResult.BuildSuccessResult("Success Get Setting", settingPars.notification);

            }

            let setting = await UserSettingEntitie.findOne({ userId: userId });

            if (setting) {

                const settingPars = JSON.parse(setting.value) as UserSettingModel;

                return OperationResult.BuildSuccessResult('Success Update UserSetting', settingPars.notification);
            }
            return OperationResult.BuildFailur('We can not find setting for this user');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async setPhoneNumber(userId: string, phoneNumber: string): Promise<OperationResult<string>> {

        try {


            let userInfo = await UnitOfWork.userRepository.FindUserById(userId);

            if (userInfo.success) {

                const generateCode = await Utiles.GerateHashCode(RedisKey.ConfirmPhoneNumber + userId);

                if (generateCode.success && generateCode.result) {

                    const sendSMS = await Sms.sendMessage('Confirm Phone Number', phoneNumber, generateCode.result.code)
                    if (sendSMS.success) {

                        return OperationResult.BuildSuccessResult('Success Send Code to Your Phone', generateCode.result?.hash);

                    }
                    return OperationResult.BuildFailur('we have a problem with send code yo your phone number , please try a few minute later');

                }

            }
            return OperationResult.BuildFailur('We can not find this user , please try with currect information');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async checkPhoneNumber(userId: string, code: string, hash: string, phoneNumber: string): Promise<OperationResult<boolean>> {

        try {

            const checkHashCode = await Utiles.CheckHashCode(RedisKey.ConfirmPhoneNumber + userId, code, hash)

            if (checkHashCode.success) {
                const userchangePhoneNumberStatus = await UnitOfWork.userRepository
                    .ChangePhoneNumberStatus(userId, true, phoneNumber);

                if (userchangePhoneNumberStatus.success) {
                    return OperationResult.BuildSuccessResult("Success Set Phone Number", true);

                }
                return OperationResult.BuildFailur(checkHashCode.message);

            }

            return OperationResult.BuildFailur(checkHashCode.message);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    /***
     *
     * Set Setting
     *
     ****/
    async SetSetting<T>(userId: string, item: T): Promise<OperationResult<boolean>> {

        try {

            const setting = await UserSettingEntitie.findOne({
                userId: userId
            });

            if (setting) {
                const updateSetting = await UserSettingEntitie.updateOne(
                    { userId: userId },
                    { value: JSON.stringify(item) });

                if (updateSetting) {
                    await RedisManager.ResetSingleItem<T>(USER_SETTING_ENUM.USER_SETTING + userId, item);
                }

                return OperationResult.BuildSuccessResult("Success Set Setting", true);

            } else {

                var newSetting = new UserSettingEntitie();
                newSetting.userId = userId;
                newSetting.value = JSON.stringify(item);
                newSetting.save();

                await RedisManager.Set(USER_SETTING_ENUM.USER_SETTING + userId, newSetting.value);
                return OperationResult.BuildSuccessResult("Success Set Setting", true);

            }
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }
    /***
     *
     * Get Setting
     *
     ****/
    async GetSetting<T>(key: string, userId: string): Promise<OperationResult<any>> {
        try {

            const getRedisSetting = await RedisManager.Get<T>(key);

            if (getRedisSetting.result) {

                return OperationResult.BuildSuccessResult("Success Get Setting", getRedisSetting.result);

            } else {

                const settingValue = UserSettingEntitie.findOne({ field: key, userId: userId }).select("value");

                return OperationResult.BuildSuccessResult("Success Get Setting", settingValue);

            }

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }

}