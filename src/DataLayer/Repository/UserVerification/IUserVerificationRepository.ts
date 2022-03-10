import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { GetAllPagingModel } from "../../../DTO/Common/GetAllPaging";
import { UserVerificationDetail } from "../../../DTO/UserVerification/user-verification-detail.model";
import { UserVerificationModel } from "../../../DTO/UserVerification/user-verification-model";
import { UserVerificationResult } from "../../../DTO/UserVerification/verification-result";

export interface IUserVerificationRepository {

    setPhoneNumber(userId: string, phoneNumber: string): Promise<OperationResult<string>>;
    checkPhoneNumber(userId: string, code: string, hash: string, phoneNumber: string): Promise<OperationResult<boolean>>;
    verification(userId: string, item: UserVerificationModel): Promise<OperationResult<UserVerificationResult>>;
    getUServerificationInfo(items: FilterViewModel<any>): Promise<OperationResult<GetAllPagingModel<any>>>;
    getUServerificationById(id: string): Promise<OperationResult<UserVerificationDetail>>;
    changeEamil(userId: string, email: string): Promise<OperationResult<string>>;
    checkEmail(userId: string, code: string, hash: string, email: string): Promise<OperationResult<boolean>>;

}