
import { InternalServerError } from "../../../core/ErrorHandler/DatabaseConectionError";
import OperationResult from "../../../core/Operation/OperationResult";
import { ReigsterUserModel } from "../../../DTO/RegisterUser/RegisterUserMode";
import { SETTING_ENUM } from "../../../DTO/Sertting/setting-enum";
import { OperationStatus } from "../../../grpc/models/CpayCPL";
import { cplayCplClientService } from "../../../grpc/services/CpayCPL.grpc.service";
import { IRegisterRepository } from "./IRegisterRepository";
import userActiveLevel from './../UserActiveLevel/UserActiveLevelRepository';
import bcrypte, { hash } from 'bcrypt';
import { UserEntite } from "../../Context/User/User";
import { UserSettingModel } from "../../../DTO/UserSetting/user-setting-model";
import { SendNotificationType } from "../../../DTO/UserSetting/notification-type.setting";
import { NodeMailer } from "../../../utiles/email/NodeMailer";
import RedisManager from "../../../utiles/Redis/RedisRepository";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import RedisKey from "../../../utiles/Redis/RedisKey";
import { Translate } from "../../../utiles/locals/Locals";


export default class RegisterRepository implements IRegisterRepository {

    async registerUser(item: ReigsterUserModel): Promise<OperationResult<string>> {
        try {

            const registerSetting = await cplayCplClientService.getRegisterSetting({
                settingType: SETTING_ENUM.REGISTER_SETTING
            });

            if (registerSetting.operationStatus == OperationStatus.SUCCESS) {

                if (!registerSetting.setDefaultRegisterUserLevel) {
                    throw new InternalServerError("We Can not Find User Level Setting");
                }

                var find = '/';
                var re = new RegExp(find, 'g');

                let password = await bcrypte.hash(item.password, 5);
                let hashCode = await (await bcrypte.hash(item.email, 5)).replace(re, '');

                let displayName = item.firstName + ' ' + item.lastName;
                let securityStamp = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);

                const findUserByEmail = await UnitOfWork.userRepository.FindByEmail(item.email);

                if (findUserByEmail.success) {
                    return OperationResult.BuildFailur(Translate.translate[item.lang].ExistEmail());
                }

                let registerUser = await UserEntite.build({
                    firstName: item.firstName,
                    gender: undefined,
                    isAdmin: false,
                    isSupport: false,
                    confirmPhoneNumber: false,
                    userLevel: registerSetting.setDefaultRegisterUserLevel,
                    password: password,
                    email: item.email,
                    lastName: item.lastName,
                    accountFail: 0,
                    avatar: undefined,
                    poster: undefined,
                    birthDate: undefined,
                    confirmEmail: false,
                    towFactorEnabled: false,
                    isActive: false,
                    locked: false,
                    lockedDate: undefined,
                    phoneNumber: undefined,
                    securityStamp: securityStamp
                });

                const setUserLevel = await UnitOfWork.UserActiveLevelRepository
                    .SetUserActiveLevel({
                        userId: registerUser.id,
                        level: registerSetting.setDefaultRegisterUserLevel
                    });

                if (setUserLevel.success) {

                    registerUser.save();

                    const setRegisterSetting = await UnitOfWork.UserSettingRepository
                        .SetSetting<UserSettingModel>
                        (registerUser.id, {
                            googleAuth: {
                                isEnable: false,
                                secretKey: null
                            },
                            notification: SendNotificationType.EMAIL,
                            twofactor: {
                                isEnable: false
                            }
                        });

                    if (setRegisterSetting.success) {

                        const generateActiveCode = await this.GenerateActivationCode(RedisKey.RegisterConfirm + registerUser.email, hashCode);
                        if (generateActiveCode.success) {

                            await NodeMailer.sendActivationCodeEmail(item.lang, registerUser.email, displayName, hashCode);

                        }
                    } else {
                        throw new InternalServerError("can not set user setting");
                    }

                }

            } else if (registerSetting.operationStatus == OperationStatus.FAIL) {
                throw new InternalServerError("Error in GRPC Get Register Settign");
            }
            return OperationResult.BuildSuccessResult(Translate.translate[item.lang].MessageSendActivationEmail({ email: item.email }), '');

        } catch (error: any) {

            throw new InternalServerError(error.message);
        }
    }

    async GenerateActivationCode(userId: string, hash: string): Promise<OperationResult<any>> {

        try {
            await RedisManager.SetValueWithexiperationTime(userId, hash, 1000);

            return OperationResult.BuildSuccessResult('Suyccess Set Value in Redis', '');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

}