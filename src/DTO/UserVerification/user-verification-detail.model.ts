import { Status } from "../Common/Status.enum";
import { UserVerificationType } from "./user-verification-enum";

export interface UserVerificationDetail {
    id: string;
    birthDate: string;
    userInfo: UserInfo;
    nationalName: string;
    status: Status;
    typeVerification: UserVerificationType;
    backImage: string;
    frontImage: string;
    image: string;
    selfieImage: string;
    createAt:string;
    updateAd:string;
}

export interface UserInfo {
    userId: string;
    email: string;
    phoneNumber: string;
    confirmEmail: boolean;
    confirmPhoneNumber: boolean;
    userAvatar: string;
    firstName: string;
    lastName: string;
}