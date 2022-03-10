import mongoose from 'mongoose';
import { Gender } from './Gender';

export interface IUserDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
    confirmEmail: boolean;
    towFactorEnabled: boolean;
    confirmPhoneNumber: boolean;
    isSupport: boolean;
    poster: string;
    avatar: string;
    userLevel?: string;
    gender?: Gender;
    userRole: any;
    birthDate: Date;
    locked: boolean;
    lockedDate: Date | undefined;
    accountFail: number;
    password: string;
    securityStamp: string;
}