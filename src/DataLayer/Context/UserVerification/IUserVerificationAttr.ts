import { Status } from "../../../DTO/Common/Status.enum";
import { UserVerificationType } from "../../../DTO/UserVerification/user-verification-enum";

export interface IUserVerificationAttrs {

    userId:any;
    birthDate: string;
    nationality: string;
    typeVerification: UserVerificationType;
    image: any;
    description?:string;
    selfieImage: any;
    frontImage: any;
    backImage: any;
    status: Status;

}
