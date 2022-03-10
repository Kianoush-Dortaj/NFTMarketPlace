
import { IUnitOfWork } from './IUnitOfWork';
import { IRegisterRepository } from '../Register/IRegisterRepository';
import RegisterRepository from '../Register/RegisterRepository';
import UserActiveLevelRepository from '../UserActiveLevel/UserActiveLevelRepository';
import { IUserActiveLevelRepository } from '../UserActiveLevel/IUserActiveLevelRepository';
import { IUserSettingRepository } from '../UserSetting/IUserSettingRepository';
import IUserRepository from '../User/IUserRepository';
import UserSettingRepository from '../UserSetting/UserSettingRepository';
import UserRepository from '../User/UserRepository';
import { ILoginRepository } from '../Login/ILoginRepository';
import LoginRepository from '../Login/LoginRepository';
import { IUserVerificationRepository } from '../UserVerification/IUserVerificationRepository';
import UserVerificationRepository from '../UserVerification/UserVerificationRepository';

export default new class UnitOfWork implements IUnitOfWork {

    RegisterUserRepository: IRegisterRepository;
    UserActiveLevelRepository: IUserActiveLevelRepository;
    UserSettingRepository: IUserSettingRepository;
    userRepository: IUserRepository;
    LoginRepository: ILoginRepository;
    UserVerification: IUserVerificationRepository;

    constructor() {

        this.RegisterUserRepository = new RegisterRepository();
        this.UserSettingRepository = new UserSettingRepository();
        this.UserActiveLevelRepository = new UserActiveLevelRepository();
        this.userRepository = new UserRepository();
        this.LoginRepository = new LoginRepository();
        this.UserVerification = new UserVerificationRepository();

    }

}