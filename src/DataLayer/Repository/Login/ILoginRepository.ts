
import OperationResult from "../../../core/Operation/OperationResult";
import { Locales } from "../../../i18n/i18n-types";
import { GenerateCode } from "./ValidatoinPattern/ValidationContext";

export interface ILoginRepository {
    UserLogin(lang: Locales,username: string, password: string): Promise<OperationResult<any>>;
    CheckAuthTwofactorCode(lang: Locales,hash: string, code: string, phoneNumber: string): Promise<OperationResult<GenerateCode>>;
    CheckAuthGoogle2FA(lang: Locales,code: string, email: string): Promise<OperationResult<GenerateCode>>;
    ForgetPassword(lang: Locales,email: string): Promise<OperationResult<string>>;
    CheckAuthForgetPasswordCode(lang: Locales,hash: string, code: string, email: string): Promise<OperationResult<string>>;
}