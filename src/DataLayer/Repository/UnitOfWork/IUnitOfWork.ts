
import { ILoginRepository } from "../Login/ILoginRepository";
import { INFT } from "../NFT/INFT";
import { IRegisterRepository } from "../Register/IRegisterRepository";
import IUserRepository from "../User/IUserRepository";
import { IUserActiveLevelRepository } from "../UserActiveLevel/IUserActiveLevelRepository";
import { IUserSettingRepository } from "../UserSetting/IUserSettingRepository";
import { IUserVerificationRepository } from "../UserVerification/IUserVerificationRepository";
export interface IUnitOfWork {

    RegisterUserRepository: IRegisterRepository;
    UserActiveLevelRepository: IUserActiveLevelRepository;
    UserSettingRepository: IUserSettingRepository;
    userRepository: IUserRepository;
    LoginRepository: ILoginRepository;
    UserVerification : IUserVerificationRepository;
    NFT:INFT;
}