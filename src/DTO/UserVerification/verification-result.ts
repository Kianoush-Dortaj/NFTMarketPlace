import { Status } from "../Common/Status.enum";
import { UserVerificationType } from "./user-verification-enum";

export interface UserVerificationResult {
    createdAt: string;
    id: string;
    status: Status;
    type: UserVerificationType;
    updatedAt: string;
}