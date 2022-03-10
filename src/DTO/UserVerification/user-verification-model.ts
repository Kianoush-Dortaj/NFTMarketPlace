import { UserVerificationType } from "./user-verification-enum";

export interface UserVerificationModel {

    birthDate: string;
    nationality: string;
    typeVerification: UserVerificationType;
    image: any;
    selfieImage: any;
    frontImage: any;
    backImage: any;
}