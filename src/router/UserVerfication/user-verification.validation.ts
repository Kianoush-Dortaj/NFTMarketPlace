


import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { UserVerificationType } from "../../DTO/UserVerification/user-verification-enum";

export default new class UserVerificationValidation {

    CreateHandle() {
        return [

            check("birthDate").notEmpty().withMessage("birthDate Can not be Empty"),
            check("nationality").notEmpty().withMessage("nationality Can not be Empty"),
            check("typeVerification").notEmpty().withMessage("typeVerification Can not be Empty"),
            check("typeVerification").custom(async (value, { req }) => {
                if (value == UserVerificationType.DIRVER_LICENCE) {
                    if (!req.body.image) {
                        return Promise.reject(
                            "you should upload the driver licence image"
                        );
                    }
                } else if (value == UserVerificationType.NATIONAL_ID) {
                    if (!req.body.frontImage) {
                        return Promise.reject(
                            "you should upload front image nationalId"
                        );
                    }
                    if (!req.body.backImage) {
                        return Promise.reject(
                            "you should upload back image nationalId"
                        );
                    }
                } else if (value == UserVerificationType.PASSPORT) {
                    if (!req.body.frontImage) {
                        return Promise.reject(
                            "you should upload first Page image of your passport"
                        );
                    }
                    if (!req.body.backImage) {
                        return Promise.reject(
                            "you should upload second Page image of your passport"
                        );
                    }
                } else if (value == UserVerificationType.SELFIE_IMAGE) {
                    if (!req.body.selfieImage) {
                        return Promise.reject(
                            "you should upload your selfie image with our format"
                        );
                    }
                }

            })

        ];
    }



}
