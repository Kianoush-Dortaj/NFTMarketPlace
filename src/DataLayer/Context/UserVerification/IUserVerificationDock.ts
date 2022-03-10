import mongoose from 'mongoose';
import { Status } from '../../../DTO/Common/Status.enum';
import { UserVerificationType } from '../../../DTO/UserVerification/user-verification-enum';

export interface IUserVerificationDoc extends mongoose.Document {

    userId: any;
    birthDate: string;
    nationality: string;
    typeVerification: UserVerificationType;
    image: any;
    description?: string;
    selfieImage: any;
    frontImage: any;
    backImage: any;
    createdAt: any;
    updateAt: any;
    status: Status;

}