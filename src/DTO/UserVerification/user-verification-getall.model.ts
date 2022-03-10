import { Status } from "../Common/Status.enum";
import { UserVerificationType } from "./user-verification-enum";

export interface UserVerificationGetAll {
    id: string;
    birthDate: string;
    userInfo: UserInfo;
    nationalName: string;
    status: Status;
    typeVerification: UserVerificationType;
    createAt:string;
    updateAd:string;
}

export interface UserInfo {
    email:string;
    userId: string;
    userAvatar: string;
    firstName: string;
    lastName: string;
}