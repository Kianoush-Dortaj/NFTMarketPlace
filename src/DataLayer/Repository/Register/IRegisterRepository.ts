import OperationResult from "../../../core/Operation/OperationResult";
import { ReigsterUserModel } from "../../../DTO/RegisterUser/RegisterUserMode";

export interface IRegisterRepository {

    registerUser(item: ReigsterUserModel): Promise<OperationResult<string>>;

}