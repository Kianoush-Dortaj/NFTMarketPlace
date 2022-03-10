import { BaseController } from "../../core/Controller/BaseController";
import { Request, Response, NextFunction } from 'express';
import UnitOfWork from "../../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { Utiles } from "../../utiles/utiles";
import { InternalServerError } from "../../core/ErrorHandler/DatabaseConectionError";

export default new class AuthController extends BaseController {

    async Create(req: Request, res: Response, next: NextFunction) {

        try {
            let validationData = await this.ValidationAction(req, res);

            if (!validationData.haveError) {

                const { firstName, password, lastName, email } = req.body;

                const acceptLang = Utiles.acceptLanguage(req);

                const createUser = await UnitOfWork.RegisterUserRepository.registerUser({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    lang: acceptLang
                });

                if (createUser.success) {
                    return this.Ok(res, createUser.message);
                } else {
                    return this.BadRerquest(res, createUser.message);
                }

            } else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        } catch (error: any) {
            next(new InternalServerError(error.message))
        }

    }

    async ResendActivationCode(req: Request, res: Response, next: NextFunction) {

        try {

            const lang = Utiles.acceptLanguage(req);

            let resendActivationCode = await UnitOfWork.userRepository.Resendactivationcode(lang, req.params.email);

            if (resendActivationCode.success) {
                return this.Ok(res, resendActivationCode.message);
            } else {
                return this.BadRerquest(res, resendActivationCode.message);
            }

        } catch (error: any) {
            next(new InternalServerError(error.message));
        }

    }

    async ConfirmCode(req: Request, res: Response, next: NextFunction) {

        try {

            const lang = Utiles.acceptLanguage(req);

            let confirmUser = await UnitOfWork.userRepository.CheckUserConfirmCode(lang, req.params.email, req.params.hash);

            if (confirmUser.success) {

                return this.Ok(res, confirmUser.message);

            } else {

                return this.BadRerquest(res, confirmUser.message);
            }
        } catch (error: any) {

            next(new InternalServerError(error.message));
        }

    }

    async ForgetPassword(req: Request, res: Response, next: NextFunction) {

        try {

            const { email } = req.body;
            const acceptLang = Utiles.acceptLanguage(req);

            let forgetPassword = await UnitOfWork.LoginRepository.ForgetPassword(acceptLang, email);

            if (forgetPassword.success) {
                return this.OkObjectResult(res, {
                    data: {
                        hash: forgetPassword.result
                    }
                }, forgetPassword.message);
            } else {
                return this.BadRerquest(res, forgetPassword.message);
            }
        } catch (error: any) {
            next(new InternalServerError(error.message));
        }

    }

    async CheckForgetPasswordCode(req: Request, res: Response, next: NextFunction) {

        try {

            const { email, hash, code } = req.body;
            const acceptLang = Utiles.acceptLanguage(req);

            let forgetPassword = await UnitOfWork.LoginRepository.CheckAuthForgetPasswordCode(acceptLang, hash, code, email);

            if (forgetPassword.success) {
                return this.OkObjectResult(res, {
                    data: {
                        token: forgetPassword.result
                    }
                }, forgetPassword.message);
            } else {
                return this.BadRerquest(res, forgetPassword.message);
            }
        } catch (error: any) {
            next(new InternalServerError(error.message));
        }

    }
}