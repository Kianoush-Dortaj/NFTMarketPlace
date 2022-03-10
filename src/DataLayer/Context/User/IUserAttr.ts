import { Gender } from "./Gender";

export interface IUserAttrs {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    isAdmin: boolean;
    confirmEmail: boolean;
    confirmPhoneNumber: boolean;
    userLevel?: any;
    isActive: boolean;
    isSupport: boolean;
    poster?: string;
    avatar?: string;
    towFactorEnabled: boolean;
    gender?: Gender;
    userRole?: string;
    birthDate?: Date;
    locked: boolean;
    lockedDate?: Date;
    accountFail: number;
    password: string;
    securityStamp: string;
}