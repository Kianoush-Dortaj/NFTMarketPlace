import OperationResult from "../../../core/Operation/OperationResult";
import { IUserDoc } from "../../Context/User/IUserDock";
import bcrypte, { hash } from 'bcrypt';
import { UserEntite } from "../../Context/User/User";
import { Gender } from "../../Context/User/Gender";
import { UpdateUserModel } from "../../../DTO/User/UpdateUserModel";
import { ChangePassword } from "../../../DTO/User/ChangePasswordModel";
import { InfoForLoginModel } from "./InfoForLoginModel";
import { GetProfileInfoModel } from "../../../DTO/User/UserInfoProfile";
import { UpdateUserAccountViewModel } from "../../../DTO/User/UserAccountviewModel";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import IUserRepository from "./IUserRepository";
import { GetUserAccountInfoModel } from "../../../DTO/User/GetUserAccountInfoModel";
import { GetUserInformationModel } from "../../../DTO/User/GetUserInformatinoModel";
import RedisManager from "../../../utiles/Redis/RedisRepository";
import RedisKey from "../../../utiles/Redis/RedisKey";
import { Utiles } from "../../../utiles/utiles";
import { NodeMailer } from "../../../utiles/email/NodeMailer";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { Locales } from "../../../i18n/i18n-types";
import { InternalServerError } from "../../../core/ErrorHandler/DatabaseConectionError";
import { Translate } from "../../../utiles/locals/Locals";

export default class UserRepository implements IUserRepository {

    // async RegisterUser(createUserDto: CreateUserDto): Promise<OperationResult<IUserDoc>> {

    //     try {

    //         let userLevel = await UnitOfWork.SettingRepository.GetSetting<SettingRegisterUserRole>(SETTING_ENUM.REGISTER_SETTING)

    //         const result = JSON.parse(userLevel.result)
    //         if (!result.setDefaultRegisterUserLevel) {
    //             return OperationResult.BuildFailur("We Can not Find User Level Setting");
    //         }

    //         var find = '/';
    //         var re = new RegExp(find, 'g');

    //         let password = await bcrypte.hash(createUserDto.password, 5);
    //         let hashCode = await (await bcrypte.hash(createUserDto.email, 5)).replace(re, '');

    //         let displayName = createUserDto.name + ' ' + createUserDto.family;
    //         let securityStamp = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);


    //         let registerUser = await UserEntite.build({
    //             firstName: createUserDto.name,
    //             gender: Number(createUserDto.gender),
    //             isAdmin: false,
    //             isSupport: false,
    //             userLevel: result.setDefaultRegisterUserLevel,
    //             password: password,
    //             email: createUserDto.email,
    //             confirmPhoneNumber: false,
    //             lastName: createUserDto.family,
    //             accountFail: 0,
    //             avatar: undefined,
    //             poster: undefined,
    //             birthDate: undefined,
    //             confirmEmail: false,
    //             towFactorEnabled: false,
    //             isActive: false,
    //             locked: false,
    //             lockedDate: undefined,
    //             phoneNumber: undefined,
    //             securityStamp: securityStamp
    //         });

    //         registerUser.save();

    //         await RedisManager.Set(RedisKey.UserInfo + registerUser._id, registerUser);
    //         await this.GenerateActivationCode(RedisKey.RegisterConfirm + registerUser.email, hashCode);
    //         await NodeMailer.sendActivationCodeEmail('fa', registerUser.email, 'CPay Configm Email', displayName, hashCode);

    //         return OperationResult.BuildSuccessResult("We Are Sent Activatoin to Your Email", registerUser);

    //     } catch (error: any) {
    //         return OperationResult.BuildFailur(error.message);
    //     }

    // }


    async FindUserByEmail(lang: Locales, email: string): Promise<OperationResult<IUserDoc>> {

        try {

            let user = await UserEntite.findOne({ email: email, isAdmin: false, isSupport: false });
            if (user) {
                return OperationResult.BuildSuccessResult("User Find", user);
            }
            return OperationResult.BuildFailur(Translate.translate[lang].CanNotFindUser());
        } catch (error: any) {
            throw new InternalServerError(error.message);
        }
    }

    async FindByEmail(email: string): Promise<OperationResult<IUserDoc>> {

        try {

            let user = await UserEntite.findOne({ email: email });

            if (user) {
                return new OperationResult<IUserDoc>(true, "User Find", user);
            }
            return new OperationResult<IUserDoc>(false, "User can Not find");
        } catch (error: any) {
            return new OperationResult<IUserDoc>(false, error.message);
        }
    }

    async FindUserById(id: string): Promise<OperationResult<IUserDoc>> {

        try {

            let user = await UserEntite.findById(id)
                .where("isAdmin").equals(false)
                .where("isSupport").equals(false);

            if (user) {
                return new OperationResult<IUserDoc>(true, "User Find", user);
            }
            return new OperationResult<IUserDoc>(false, "User can Not find");
        } catch (error: any) {
            return new OperationResult<IUserDoc>(false, error.message);
        }
    }

    async GenerateActivationCode(userId: string, hash: string): Promise<OperationResult<any>> {

        try {
            await RedisManager.SetValueWithexiperationTime(userId, hash, 1000);

            return OperationResult.BuildSuccessResult('Success', true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    async CheckUserConfirmCode(lang: Locales, email: string, hashCode: string): Promise<OperationResult<any>> {

        try {
            let item = await RedisManager.Get<any>(RedisKey.RegisterConfirm + email);

            if (item.success && item.result == hashCode) {

                await UserEntite.findOneAndUpdate({ email: email }, {
                    $set: {
                        isActive: true,
                        confirmEmail: true
                    }
                });

                let deleteActivatinCode = await RedisManager.Remove(RedisKey.RegisterConfirm + email);

                if (deleteActivatinCode.success) {
                    return OperationResult.BuildSuccessResult(Translate.translate[lang].SuccessEmailConfirmCode(), true);
                }
                throw new InternalServerError("Error in Delete Activation Code in Redis");

            }
            return OperationResult.BuildFailur(Translate.translate[lang].ExpireActivationCode());

        } catch (error: any) {

            throw new InternalServerError(error.message);

        }
    }

    async Resendactivationcode(lang: Locales, email: string): Promise<OperationResult<any>> {

        var find = '/';
        var re = new RegExp(find, 'g');
        let hashCode = await (await bcrypte.hash(email, 5)).replace(re, '');

        let displayName: string;

        let userInfo = await this.FindUserByEmail(lang, email);

        if (userInfo.success && userInfo.result) {

            displayName = userInfo.result.firstName + userInfo.result?.lastName

            let generateKey = await this.GenerateActivationCode(RedisKey.RegisterConfirm + email, hashCode);

            if (generateKey.success && generateKey.result) {

                await NodeMailer.sendActivationCodeEmail(lang, userInfo.result.email, displayName, hashCode);

                return OperationResult.BuildSuccessResult(Translate.translate[lang].SendActivationLink({ email: email }), true);
            }
            throw new InternalServerError(generateKey.message);
        }
        return OperationResult.BuildFailur(userInfo.message);

    }

    /**********
    * Get Manager Account Info
    ********/
    async GetUserAccountInfo(id: string): Promise<OperationResult<GetUserAccountInfoModel>> {

        try {

            let redisValue = await RedisManager.Get<UpdateUserAccountViewModel>(RedisKey.UserAccount + id);

            if (redisValue.result) {
                return OperationResult
                    .BuildSuccessResult('Operation Success', {
                        email: redisValue.result.email,
                        isActive: redisValue.result.isActive
                    });
            }

            let getUserInfo = await UserEntite.findById(id)
                .where("isAdmin").equals(false)
                .where("isSupport").equals(false)
                .select('email isActive id');

            if (getUserInfo) {
                let setRedisValue = await RedisManager.Set(RedisKey.UserAccount + id,
                    {
                        email: getUserInfo.email,
                        id: getUserInfo.id,
                        isActive: getUserInfo.isActive
                    });
                if (setRedisValue.success) {
                    return OperationResult.BuildSuccessResult('Operation Success', {
                        email: getUserInfo.email,
                        isActive: getUserInfo.isActive
                    });
                }
                return OperationResult.BuildFailur(setRedisValue.message);
            } else {
                return OperationResult.BuildFailur('User NotFound');
            }

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    /**********
   * Get Manager Info
   ********/
    async GetUserInformation(id: string): Promise<OperationResult<GetUserInformationModel>> {

        try {

            let redisValue = await RedisManager.Get<GetUserInformationModel>(RedisKey.UserInforamtion + id);

            if (redisValue.result) {
                return OperationResult.BuildSuccessResult('Operation Success', redisValue.result);
            }

            let getUserInfo = await UserEntite.findById(id)
                .where("isAdmin").equals(false)
                .where("isSupport").equals(false)
                .select('firstName avatar lastName gender id');

            if (getUserInfo) {
                let setRedisValue = await RedisManager.Set(RedisKey.UserInforamtion + id,
                    {
                        firstName: getUserInfo.firstName,
                        id: getUserInfo.id,
                        lastName: getUserInfo.lastName,
                        avatar: getUserInfo.avatar
                    });
                if (setRedisValue.success) {
                    return OperationResult.BuildSuccessResult('Operation Success', {
                        firstName: getUserInfo.firstName,
                        hasAvatar: getUserInfo.avatar ? true : false,
                        id: getUserInfo._id,
                        lastName: getUserInfo.lastName
                    });
                }
                return OperationResult.BuildFailur(setRedisValue.message);
            } else {
                return OperationResult.BuildFailur('User NotFound');
            }

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    /**********
     * Get User Info
     ********/
    async GetUserInfo(id: string): Promise<OperationResult<IUserDoc | undefined>> {

        let redisValue = await RedisManager.Get<IUserDoc>(RedisKey.UserInfo + id);

        if (redisValue.result) {
            return OperationResult.BuildSuccessResult('Operation Success', redisValue.result);
        }

        let getUserInfo = await UserEntite.findById(id)
            .where("isAdmin").equals(false)
            .where("isSupport").equals(false);

        if (getUserInfo) {
            let setRedisValue = await RedisManager.Set(RedisKey.UserInforamtion + id, getUserInfo);
            if (setRedisValue.success) {
                return OperationResult.BuildSuccessResult('Operation Success', getUserInfo);
            }
            return OperationResult.BuildFailur(setRedisValue.message);
        } else {
            return OperationResult.BuildFailur('User NotFound');
        }
    }

    /**********
     * Get User Info by Username
     ********/
    async GetUserByUsername(userName: string): Promise<OperationResult<IUserDoc | undefined>> {

        let redisValue = await RedisManager.Get<IUserDoc>(RedisKey.UserInfo + userName);

        if (redisValue.result) {
            return OperationResult.BuildSuccessResult('Operation Success', redisValue.result);
        }

        let getUserInfo = await UserEntite.findOne({ email: userName, isAdmin: false, isSupport: false });

        if (getUserInfo) {
            let setRedisValue = await RedisManager.Set(RedisKey.UserInforamtion + userName, getUserInfo);
            if (setRedisValue.success) {
                return OperationResult.BuildSuccessResult('Operation Success', getUserInfo);
            }
            return OperationResult.BuildFailur(setRedisValue.message);
        } else {
            return OperationResult.BuildFailur('User NotFound');
        }
    }

    /**********
     * Update Manager Info
     ********/
    async UpdateUserInfo(item: UpdateUserModel): Promise<OperationResult<boolean>> {

        let avatarUrl = undefined;
        try {

            if (item.file) {
                avatarUrl = Utiles.getDirectoryImage(
                    `${item.file.destination}/${item.file.originalname}`
                );
            }

            await UserEntite.updateOne(
                { _id: item.userId },
                {
                    $set: {
                        firstName: item.firstName,
                        gender: Number(item.gender),
                        lastName: item.lastName,
                        avatar: item.file != undefined ? avatarUrl : item.exAvatarUrl
                    },
                }
            )
            await RedisManager.ResetSingleItem(RedisKey.UserInforamtion + item.userId, {
                firstName: item.firstName,
                id: item.userId,
                gender: Gender[item.gender],
                lastName: item.lastName,
                avatar: item.file != undefined ? avatarUrl : item.exAvatarUrl
            })
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
     * Update Account Manager Info
     ********/
    async UpdateAccountInfo(userId: string, email: string, isActive: boolean): Promise<OperationResult<boolean>> {

        let avatarUrl = undefined;
        try {

            const updateAcountInfo = await UserEntite.updateOne(
                { _id: userId },
                {
                    $set: {
                        email: email,
                        isActive: isActive
                    },
                }
            )

            await RedisManager.Remove(RedisKey.UserInfo + userId);
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
    * ChangePassword
    ********/
    async ChangePassword(item: ChangePassword): Promise<OperationResult<boolean>> {

        try {
            let password = await bcrypte.hash(item.password, 5);

            await UserEntite.updateOne(
                { _id: item.userId },
                {
                    $set: {
                        password: password
                    },
                }
            );
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
    * Change 2FA Status
    ********/
    async Change2FaStatus(userId: string, value: boolean): Promise<OperationResult<boolean>> {

        try {

            await UserEntite.updateOne(
                { _id: userId },
                {
                    $set: {
                        towFactorEnabled: value
                    },
                }
            );
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
    * Change 2FA Status
    ********/
    async ChangePhoneNumberStatus(userId: string, value: boolean, phoneNumber: string): Promise<OperationResult<boolean>> {

        try {

            await UserEntite.updateOne(
                { _id: userId },
                {
                    $set: {
                        confirmPhoneNumber: value,
                        phoneNumber: phoneNumber
                    },
                }
            );
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
    * Change 2FA Status
    ********/
    async ChangeEmailStatus(userId: string, value: boolean, email: string): Promise<OperationResult<boolean>> {

        try {

            await UserEntite.updateOne(
                { _id: userId },
                {
                    $set: {
                        confirmEmail: value,
                        email: email
                    },
                }
            );
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }


    /**********
   * Get User Info for Login
   ********/
    async GetUserInfoForLogin(username: string): Promise<OperationResult<InfoForLoginModel>> {

        try {

            let model: InfoForLoginModel;

            let userInfo = await UserEntite.findOne({ email: username, isAdmin: false, isSupport: false })
                .select("securityStamp firstName lastName");

            if (userInfo) {
                model = {
                    userSecurityStamp: userInfo.securityStamp,
                    displayName: userInfo.firstName + ' ' + userInfo.lastName,
                    id: userInfo.id,
                }

                return OperationResult.BuildSuccessResult('', model);
            }
            return OperationResult.BuildFailur('Error');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
   * Get User Profile Information
   ********/
    async GetUserProfileInformation(userId: string): Promise<OperationResult<GetProfileInfoModel>> {
        try {
            let userInfo = await UserEntite.findById(userId);
            if (userInfo) {
                return OperationResult.BuildSuccessResult('User Found', {
                    displayName: userInfo.firstName + ' ' + userInfo.lastName,
                    emailConfirm: userInfo.confirmEmail,
                    gender: Gender[Number(userInfo.gender)],
                    hasAvatar: userInfo.avatar ? true : false,
                    hasPoster: userInfo.poster ? true : false,
                    id: userInfo.id,
                    owner: true,
                    aboutMe: ''
                });
            }
            return OperationResult.BuildFailur('User not Found');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }

    /**********
    * Get All Manager
    ********/
    async GetAllManagerPaging(items: FilterViewModel<GetAllUserFilter>): Promise<OperationResult<IUserDoc[]>> {


        const query: any = [];

        Object.keys(items.filters).forEach(key => {
            const value = items.filters[key as keyof GetAllUserFilter];
            if (key === 'email' && value) {
                query.push({ email: { $regex: `(.*)${value}(.*)` } });
            } else {
                query.push({ [key]: value });
            }
        });

        let userList = await UserEntite.find(...query).where({ isUser: true }).skip((items.page - 1) * items.pageSize)
            .limit(items.pageSize)

        return OperationResult.BuildSuccessResult('Operation Success', userList);

    }

    async FindUserByEmailForLogin(email: string): Promise<OperationResult<any>> {

        try {

            let user = await UserEntite.findOne({ email: email });

            if (user) {
                return OperationResult.BuildSuccessResult("Operation Success", user);
            }
            return OperationResult.BuildFailur("Can not find User");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    async FindUserByPhoneNmber(phoneNumber: string): Promise<OperationResult<any>> {

        try {

            let user = await UserEntite.findOne({ phoneNumber: phoneNumber });

            if (user) {
                return OperationResult.BuildSuccessResult("Operation Success", user);
            }
            return OperationResult.BuildFailur("Can not find User");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }
}
