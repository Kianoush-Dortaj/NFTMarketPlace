import { BaseController } from "../../core/Controller/BaseController";
import { Request, Response, NextFunction } from 'express';
import UnitOfWork from "../../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { Utiles } from "../../utiles/utiles";
import { InternalServerError } from "../../core/ErrorHandler/DatabaseConectionError";

export default new class LoginController extends BaseController {



    async LoginUser(req: Request, res: Response, next: NextFunction) {

        try {

            let validation = await this.ValidationAction(req, res);
            if (!validation.haveError) {

                const lang = Utiles.acceptLanguage(req);

                const { email, password } = req.body;

                let loginUser = await UnitOfWork.LoginRepository.UserLogin(lang, email, password)

                if (loginUser.success) {

                    return this.OkObjectResult(res, loginUser.result, "Success Login");
                } else {
                    return this.BadRerquest(res, loginUser.message);
                }
            }
            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error: any) {
            next(new InternalServerError(error.message));
        }

    }

    async UserCheckAuthTowfactor(req: Request, res: Response, next: NextFunction) {

        try {

            const { hash, code, email } = req.body;
            const lang = Utiles.acceptLanguage(req);

            let result = await UnitOfWork.LoginRepository.CheckAuthTwofactorCode(lang, hash, code, email);

            if (result.success && !result.result?.isTowfactor) {
                return this.OkObjectResult(res, {
                    data: result.result
                }, "Success Towfactor");
            }

            return this.BadRerquest(res, result.message);
        } catch (error: any) {
            next(new InternalServerError(error.message));
        }


    }

    async UserCheckAuthForgetPasswordCode(req: Request, res: Response, next: NextFunction) {

        try {
            const { hash, code, email } = req.body;
            const lang = Utiles.acceptLanguage(req);

            let result = await UnitOfWork.LoginRepository.CheckAuthForgetPasswordCode(lang, hash, code, email);

            if (result.success) {
                return this.OkObjectResult(res, {
                    data: result.result
                }, "Success Confirm Code Towfactor");
            }

            return this.BadRerquest(res, result.message);
        } catch (error: any) {
            next(new InternalServerError(error.message));
        }


    }

    async UserCheckAuth2FA(req: Request, res: Response, next: NextFunction) {

        try {
            const { code, email } = req.body;
            const lang = Utiles.acceptLanguage(req);

            let result = await UnitOfWork.LoginRepository.CheckAuthGoogle2FA(lang, code, email);

            if (result.success && !result.result?.isTowfactor) {
                return this.OkObjectResult(res, {
                    data: result.result
                }, "Success Google Auth");
            }

            return this.BadRerquest(res, result.message);
        } catch (error: any) {
            next(new InternalServerError(error.message));
        }


    }



}