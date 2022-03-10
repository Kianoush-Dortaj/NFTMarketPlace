import { ValidateEmailConfrim } from './ValidatoinPattern/ValidateEmailConfirm';
import { ILoginRepository } from "./ILoginRepository";
import { ValidateBlocked } from "./ValidatoinPattern/ValidateBlocked";
import { IHandler } from './ValidatoinPattern/IHandler';
import { GenerateCode, ValidationContext } from './ValidatoinPattern/ValidationContext';
import { ValidatePassword } from './ValidatoinPattern/ValidatePassword';
import { ValidateTowFactor } from './ValidatoinPattern/ValidateTowFactor';
import unitofWork from './../UnitOfWork/UnitOfWork';
import OperationResult from '../../../core/Operation/OperationResult';
import { IUserDoc } from '../../Context/User/IUserDock';
import { ValidateGoogleAuth } from './ValidatoinPattern/ValidateGoogleAuth';
import speakeasy from 'speakeasy';
import { Jwt } from '../../../utiles/jwt/Jwt';
import RedisRepository from '../../../utiles/Redis/RedisRepository';
import RedisKey from '../../../utiles/Redis/RedisKey';
import { CpayNotification } from '../../../utiles/Notification/Notification';
import { InternalServerError } from '../../../core/ErrorHandler/DatabaseConectionError';
import { Locales } from '../../../i18n/i18n-types';
import { Utiles } from '../../../utiles/utiles';
import { Translate } from '../../../utiles/locals/Locals';

export default class LoginRepository implements ILoginRepository {

    // Login Special for login

    async UserLogin(lang: Locales, username: string, password: string): Promise<OperationResult<GenerateCode>> {

        let user = await unitofWork.userRepository.FindUserByEmailForLogin(username);

        if (user.success) {

            const isBlocked = new ValidateBlocked();
            const isEmailComfirmed = new ValidateEmailConfrim();
            const isValidatePassword = new ValidatePassword(password);
            const isvalidatetowfactor = new ValidateTowFactor();
            const isvalidateGoogleAuth = new ValidateGoogleAuth();

            isValidatePassword.setNext(lang, isBlocked)
                .setNext(lang, isEmailComfirmed)
                .setNext(lang, isvalidatetowfactor)
                .setNext(lang, isvalidateGoogleAuth);

            let result = await this.ValidationManagerForLogin(lang, isValidatePassword, user.result);

            if (result.HaveError) {
                return OperationResult.BuildFailur(result.Message)
            }

            if (result.Context.isTowfactor) {

                let code = await RedisRepository.Get<any>(RedisKey.TowfactorKey + username);

                if (code.result) {

                    CpayNotification.send(user.result.id, code.result.code, Translate.translate[lang].TwofactorCodeTitle());

                    return OperationResult.BuildSuccessResult(result.Message, result.Context)
                }

                throw new InternalServerError('Error in generate code twofactor');

            }

            if (result.Context.isGoogle2FA) {

                return OperationResult.BuildSuccessResult(result.Message, result.Context)

            }

            let userInfo = await unitofWork.userRepository.GetUserInfoForLogin(username);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message)
            }

            let token = await Jwt.GenerateToken(userInfo.result);

            if (token.success) {

                return OperationResult.BuildSuccessResult(token.message, {
                    hash: '',
                    isTowfactor: false,
                    isGoogle2FA: false,
                    token: token.result,
                    userInfo: {
                        displayName: userInfo.result?.displayName
                    }
                });
            }
            return OperationResult.BuildFailur(token.message)

        }
        return OperationResult.BuildFailur(Translate.translate[lang].UsernameOrPAsswordNotValid())

    }

    /*******
     * check Auth towfactor Code
     ******/

    async CheckAuthTwofactorCode(lang: Locales, hash: string, code: string, email: string): Promise<OperationResult<GenerateCode>> {

        try {

            let redisValue;

            let findKeyInRedis = await RedisRepository.Get<any>(RedisKey.TowfactorKey + email);

            if (findKeyInRedis.result) {
                redisValue = JSON.parse(findKeyInRedis.result);
            }

            let userInfo = await unitofWork.userRepository.GetUserInfoForLogin(email);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message);
            }

            if (!findKeyInRedis.success) {

                return OperationResult.BuildFailur(findKeyInRedis.message);

            } else if (redisValue.code != code || redisValue.hash != hash) {

                return OperationResult.BuildFailur(Translate.translate[lang].ExpireActivationCode());
            }

            let token = await Jwt.GenerateToken(userInfo.result);

            if (token.success) {
                let displayName = userInfo.result?.displayName;
                return OperationResult.BuildSuccessResult(token.message, {
                    hash: '',
                    isTowfactor: false,
                    isGoogle2FA: false,
                    token: token.result,
                    userInfo: {
                        displayName: displayName
                    }
                });
            }

            return OperationResult.BuildFailur(token.message);
        } catch (error: any) {
            throw new InternalServerError(error.message)
        }


    }

    /*******
     * check Auth Forgetpassword Code
     ******/

    async CheckAuthForgetPasswordCode(lang: Locales, hash: string, code: string, email: string): Promise<OperationResult<string>> {

        try {

            let findKeyInRedis = await RedisRepository.Get<any>(RedisKey.ForgetPasswordKey + email);

            if (!findKeyInRedis.success) {

                return OperationResult.BuildFailur(findKeyInRedis.message);
            } else if (findKeyInRedis.result.code != code || findKeyInRedis.result.hash != hash) {

                return OperationResult.BuildFailur(Translate.translate[lang].ExpireActivationCode());
            }
            
            let userInfo = await unitofWork.userRepository.GetUserInfoForLogin(email);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message);
            }



            const generateHashCode = await Utiles.GerateHashCode(RedisKey.ForgetPasswordKey + email);

            if (generateHashCode.result && generateHashCode.success) {
                return OperationResult.BuildSuccessResult("Success Validation", generateHashCode.result?.hash);
            }

            return OperationResult.BuildFailur(generateHashCode.message);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    /*******
     * check Auth Google 2FA
     ******/

    async CheckAuthGoogle2FA(lang: Locales, code: string, email: string): Promise<OperationResult<GenerateCode>> {

        try {


            let userInfo = await unitofWork.userRepository.FindByEmail(email);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message);
            }

            let userSettingInfo = await unitofWork.UserSettingRepository
                .getGoogleAuthSetting(userInfo.result?.id);

            if (!userSettingInfo.success) {
                return OperationResult.BuildFailur(Translate.translate[lang].CanNotFindUser());

            }

            const soeasy = speakeasy.totp.verify({
                secret: userSettingInfo.result?.secretKey.base32,
                token: code,
                encoding: 'base32',
                window: 1
            })

            if (!soeasy) {
                return OperationResult.BuildFailur(Translate.translate[lang].ExpireActivationCode());
            }

            let token = await Jwt.GenerateToken(userInfo.result);

            if (token.success) {
                let displayName = userInfo.result?.firstName + ' ' + userInfo.result?.lastName;
                return OperationResult.BuildSuccessResult(token.message, {
                    hash: '',
                    isTowfactor: false,
                    isGoogle2FA: false,
                    token: token.result,
                    userInfo: {
                        displayName: displayName
                    }
                });
            }

            return OperationResult.BuildFailur(token.message);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    // Validatoin Manager Login

    async ValidationManagerForLogin(lang: Locales, handler: IHandler, user: IUserDoc): Promise<ValidationContext> {

        let result = handler.handle(lang, user);
        return result;
    }

    /*******
     * Forget Password
     ******/
    async ForgetPassword(lang: Locales, email: string): Promise<OperationResult<string>> {
        try {

            let user = await unitofWork.userRepository.FindUserByEmailForLogin(email);
            const generateHashCode = await Utiles.GerateHashCode(RedisKey.ForgetPasswordKey + email);


            if (!user.success) {
                return OperationResult.BuildFailur(Translate.translate[lang].CanNotFindUser());

            }

            let displayName = user.result.firstName + ' ' + user.result.lastName;

            let emailData = `<h1>${Translate.translate[lang].ForgetPasswordTitle()}</h1>
            <h2>${Translate.translate[lang].HI({name:displayName})}</h2>
            <p>This is your Forget Password Code for Login in CPAY Website </p>
            <h1>${generateHashCode.result?.code}</h1>
            <p>This code Will be Expire in 2 Minutes </p>
            </div>`;

            if (generateHashCode.success) {
                const sendEmail = await CpayNotification.send(user.result.id, emailData, Translate.translate[lang].ForgetPasswordTitle());

                if (sendEmail.success && generateHashCode.result) {
                    return OperationResult.BuildSuccessResult("Success Send Email", generateHashCode.result?.hash)
                }
                return OperationResult.BuildFailur(sendEmail.message);

            }

            throw new InternalServerError("Error in Generate Twofactor Code")
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }

}