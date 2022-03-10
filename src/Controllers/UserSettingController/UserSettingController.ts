import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import unitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import qrCode from 'qrcode';
import { Jwt } from '../../utiles/jwt/Jwt';

export default new class SettingController extends BaseController {

    constructor() {
        super();
    }

    /**********
     *
     * Set Register Setting
     *
     ************/
    async SetGoogleAuth2FASetting(req: Request, res: Response, next: NextFunction) {
        try {

            const { isEnable } = req.body;
            let userId = (await Jwt.DecodeToken(req, res, next)).result;

            const findUser = await unitOfWork.userRepository.FindUserById(userId);
            if (!findUser.result) {
                return this.BadRerquest(res, "We can not Find User");

            }

            const setRegisterSetting = await unitOfWork.UserSettingRepository
                .setGoogleAuthSetting(userId, isEnable);

            if (setRegisterSetting.success) {

                if (isEnable === true && findUser.result?.towFactorEnabled === true) {

                    const change2FAStatus = await unitOfWork.userRepository.Change2FaStatus(userId, false);

                    if (!change2FAStatus.success) {
                        return this.BadRerquest(res, "We Have Problem change the Change 2fa status");
                    }
                }

                const qr = await qrCode.toDataURL(setRegisterSetting.result.otpauth_url);

                return this.OkObjectResult(res, {
                    data: {
                        qrCode: isEnable ? qr : '',
                        base32: isEnable ? setRegisterSetting.result.base32 : ''
                    }
                }, "Success Set Setting");
            }

            return this.BadRerquest(res, setRegisterSetting.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
   *
   * Get Register Setting
   *
   ************/
    async GetGoogleAuth2FASetting(req: Request, res: Response, next: NextFunction) {

        try {

            let userId = (await Jwt.DecodeToken(req, res, next)).result;

            const getRegisterSettingValue = await unitOfWork.UserSettingRepository
                .getGoogleAuthSetting(userId);

            if (getRegisterSettingValue.success) {

                return this.OkObjectResult(res, {
                    data: getRegisterSettingValue.result
                }, "Get Register Setting");
            }

            return this.BadRerquest(res, getRegisterSettingValue.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }

    /**********
     *
     * Set Register Setting
     *
     ************/
    async SetTwofactorSetting(req: Request, res: Response, next: NextFunction) {
        try {

            const { isEnableTwofactor } = req.body;

            let userId = (await Jwt.DecodeToken(req, res, next)).result;

            const findUser = await unitOfWork.userRepository.FindUserById(userId);

            if (!findUser.result) {
                return this.BadRerquest(res, "We can not Find User");

            }

            const change2FAStatus = await unitOfWork.userRepository.Change2FaStatus(userId, isEnableTwofactor);

            if (!change2FAStatus.success) {
                return this.BadRerquest(res, "We Have Problem change the Change 2fa status");
            }

            const getRegisterSettingValue = await unitOfWork.UserSettingRepository
                .setTwofactorSetting(userId, isEnableTwofactor);

            if (getRegisterSettingValue.result.isEnable === true) {

                const setRegisterSetting = await unitOfWork.UserSettingRepository
                    .setGoogleAuthSetting(userId, false);

                if (setRegisterSetting.success === false) {
                    return this.BadRerquest(res, "We Have Problem change the Change Google Auth status");

                }
            }

            return this.Ok(res, change2FAStatus.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
   *
   * Get Register Setting
   *
   ************/
    async GetTwofactorSetting(req: Request, res: Response, next: NextFunction) {

        try {

            let userId = (await Jwt.DecodeToken(req, res, next)).result;

            const getTwofactorSetting = await unitOfWork.UserSettingRepository
                .getTwofactorSetting(userId);

            if (getTwofactorSetting.success) {

                return this.OkObjectResult(res, {
                    data: {
                        isEnableTwofactor: getTwofactorSetting.result
                    }
                }, "Get Twofactor Setting");
            }

            return this.BadRerquest(res, getTwofactorSetting.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
    *
    * Set Register Setting
    *
    ************/
    async SetNotificationSetting(req: Request, res: Response, next: NextFunction) {
        try {

            const { sendNotificationType } = req.body;

            let userId = (await Jwt.DecodeToken(req, res, next)).result;

            const findUser = await unitOfWork.userRepository.FindUserById(userId);

            if (!findUser.result) {
                return this.BadRerquest(res, "We can not Find User");

            }

            const setNotificationSettingValue = await unitOfWork.UserSettingRepository
                .setNotificationSetting(userId, sendNotificationType);



            return this.Ok(res, setNotificationSettingValue.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }

    /**********
   *
   * Get Register Setting
   *
   ************/
    async GetNotificationSetting(req: Request, res: Response, next: NextFunction) {

        try {

            let userId = (await Jwt.DecodeToken(req, res, next)).result;

            const getTwofactorSetting = await unitOfWork.UserSettingRepository
                .getNotificationSetting(userId);

            if (getTwofactorSetting.success) {
                
                return this.OkObjectResult(res, {
                    data: {
                        sendNotificationType: getTwofactorSetting.result
                    }
                }, "Get Notification Setting");
            }

            return this.BadRerquest(res, getTwofactorSetting.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }

}