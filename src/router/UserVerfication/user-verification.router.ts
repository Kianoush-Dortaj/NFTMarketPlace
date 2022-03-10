
import express from 'express';
import UserVerificationController from '../../Controllers/UserVerificationController/UserVerifivationController';
import middlware from './../../middleware/Authorization';
import FileToField from '../../middleware/FileToField';
import userVerification from './user-verification.validation';
import uploadVerification from './../../utiles/Multer/Varification';

const settingRouter = express.Router();

settingRouter.put("/SetPhoneNumber",
    middlware.AuthToken,
    UserVerificationController.SetPhoneNumber);

settingRouter.post("/CheckPhoneNumber",
    middlware.AuthToken,
    UserVerificationController.CheckActivePhoneNumber);

settingRouter.put("/ChangeEmail",
    middlware.AuthToken,
    UserVerificationController.SetEmail);

settingRouter.post("/CheckActivationEmail",
    middlware.AuthToken,
    UserVerificationController.CheckActiveEmail);

settingRouter.get("/GetUSerVerificationInfo",
    middlware.AuthToken,
    UserVerificationController.GetUserVerification);

settingRouter.post("/Verification",
    middlware.AuthToken,
    uploadVerification.fields([
        { name: "frontImage", maxCount: 1 },
        { name: "backImage", maxCount: 1 },
        { name: "image", maxCount: 1 },
        { name: "selfieImage", maxCount: 1 }

    ]),
    FileToField.FileToBackImage,
    FileToField.FileToFrontImage,
    FileToField.FileToImage,
    FileToField.FileToSelfieImage,
    userVerification.CreateHandle(),
    UserVerificationController.SendVerification);

export default settingRouter;
