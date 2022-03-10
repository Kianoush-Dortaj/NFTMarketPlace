import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import unitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import qrCode from 'qrcode';
import { Jwt } from '../../utiles/jwt/Jwt';

export default new class SettingController extends BaseController {

    constructor() {
        super();
    }

    /**********
    *
    * Set Phone number
    *
    ************/
    async SetPhoneNumber(req: Request, res: Response, next: NextFunction) {
        try {

            const { phoneNumber } = req.body;

            let userId = (await Jwt.DecodeToken(req, res, next)).result;

            const setPhoneNumber = await unitOfWork.UserVerification
                .setPhoneNumber(userId, phoneNumber);

            if (setPhoneNumber.success) {
                return this.OkObjectResult(res, {
                    data: {
                        hash: setPhoneNumber.result
                    }
                }, setPhoneNumber.message);
            }

            return this.BadRerquest(res, setPhoneNumber.message);

        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
    *
    * Check Phone number
    *
    ************/
    async CheckActivePhoneNumber(req: Request, res: Response, next: NextFunction) {
        try {

            const { phoneNumber, hash, code } = req.body;

            let userId = (await Jwt.DecodeToken(req, res, next)).result;

            const setPhoneNumber = await unitOfWork.UserVerification
                .checkPhoneNumber(userId, code, hash, phoneNumber);

            if (setPhoneNumber.success) {
                return this.Ok(res, setPhoneNumber.message);
            }

            return this.BadRerquest(res, setPhoneNumber.message);

        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
    *
    * Change Email
    *
    ************/
    async SetEmail(req: Request, res: Response, next: NextFunction) {
        try {

            const { email } = req.body;

            let userId = (await Jwt.DecodeToken(req, res, next)).result;

            const setPhoneNumber = await unitOfWork.UserVerification
                .changeEamil(userId, email);

            if (setPhoneNumber.success) {
                return this.OkObjectResult(res, {
                    data: {
                        hash: setPhoneNumber.result
                    }
                }, setPhoneNumber.message);
            }

            return this.BadRerquest(res, setPhoneNumber.message);

        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
    *
    * Check Email
    *
    ************/
    async CheckActiveEmail(req: Request, res: Response, next: NextFunction) {
        try {

            const { phoneNumber, hash, code } = req.body;

            let userId = (await Jwt.DecodeToken(req, res, next)).result;

            const setPhoneNumber = await unitOfWork.UserVerification
                .checkEmail(userId, code, hash, phoneNumber);

            if (setPhoneNumber.success) {
                return this.Ok(res, setPhoneNumber.message);
            }

            return this.BadRerquest(res, setPhoneNumber.message);

        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
    *
    * Send Verification
    *
    ************/
    async SendVerification(req: Request, res: Response, next: NextFunction) {
        try {

            let validationData = await this.ValidationAction(req, res);

            if (!validationData.haveError) {
                const { backImage,
                    birthDate,
                    frontImage,
                    image,
                    nationality,
                    selfieImage,
                    typeVerification } = req.body;

                let userId = (await Jwt.DecodeToken(req, res, next)).result;

                const sendVerification = await unitOfWork.UserVerification
                    .verification(userId, {
                        backImage,
                        birthDate,
                        frontImage,
                        image,
                        nationality,
                        selfieImage,
                        typeVerification
                    });

                if (sendVerification.success) {
                    return this.OkObjectResult(res, {
                        data: sendVerification.result
                    }, sendVerification.message);
                }

                return this.BadRerquest(res, sendVerification.message);
            }

            return this.BadRerquest(res, validationData.errorMessage.toString());

        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }

    }

    /**********
    *
    * Get User Verification
    *
    ************/
    async GetUserVerification(req: Request, res: Response, next: NextFunction) {
        try {

            let validationData = await this.ValidationAction(req, res);

            if (!validationData.haveError) {

                let userId = (await Jwt.DecodeToken(req, res, next)).result;

                const getVerification = await unitOfWork.UserVerification
                    .getUServerificationById(userId);

                if (getVerification.success) {
                    return this.OkObjectResult(res, {
                        data: getVerification.result
                    }, getVerification.message);
                }

                return this.BadRerquest(res, getVerification.message);
            }

            return this.BadRerquest(res, validationData.errorMessage.toString());

        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }

    }

}