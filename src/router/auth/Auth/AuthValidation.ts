import { check } from "express-validator";
import path from "path";
import UnitOfWork from "../../../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { Translate } from "../../../utiles/locals/Locals";
import { Utiles } from "../../../utiles/utiles";

export default new class UserValidation {

    CreateHandle() {
        return [

            check("firstName").notEmpty().withMessage("firstName Can not be Empty"),
            check("email").notEmpty().withMessage("email Can not be Empty"),
            check("email").custom(async (value, { req }) => {

                if (value) {
                    const acceptLang = Utiles.acceptLanguage(req);
                    const data = await UnitOfWork.userRepository
                        .FindByEmail(value);

                    if (data.success) {
                        throw new Error(Translate.translate[acceptLang].ExistEmail());
                    }
                }
            }),
            // check("phoneNumber").notEmpty().withMessage("phoneNumber Can not be Empty"),
            // check("countryId").notEmpty().withMessage("countryId Can not be Empty"),
            // check("countryId").custom(async (value) => {

            //     if (value) {

            //         const data = await unitofWotk.adminRepository
            //             .GetUserByUsername(value);

            //         if (data.success) {
            //             throw new Error(" This Selected Country is Exsist");
            //         }
            //     }
            // }),
            check("password").notEmpty().withMessage("password Can not be Empty"),
            check("confirmPassword").notEmpty().withMessage("confirmPassword Can not be Empty"),
            check("confirmPassword").custom(async (value, { req }) => {

                if (value !== req.body.password) {
                    const acceptLang = Utiles.acceptLanguage(req);
                    throw new Error(Translate.translate[acceptLang].PasswordAndConfirmNotMatched());
                }
            }),
            check("lastName").notEmpty().withMessage("lastName Can not be Empty"),
        ];
    }
}
