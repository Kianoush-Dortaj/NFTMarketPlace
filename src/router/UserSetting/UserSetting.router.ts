
import express from 'express';
import SettingController from '../../Controllers/UserSettingController/UserSettingController';
import middlware from './../../middleware/Authorization';

const settingRouter = express.Router();

settingRouter.put("/SetGoogleAuth2Fa",
    middlware.AuthToken,
    SettingController.SetGoogleAuth2FASetting);

settingRouter.get("/GetGoogleAuth2Fa",
    middlware.AuthToken,
    SettingController.GetGoogleAuth2FASetting);

settingRouter.put("/SetTwofactor",
    middlware.AuthToken,
    SettingController.SetTwofactorSetting);

settingRouter.get("/GetTwofactor",
    middlware.AuthToken,
    SettingController.GetTwofactorSetting);

settingRouter.put("/SetNotification",
    middlware.AuthToken,
    SettingController.SetNotificationSetting);

settingRouter.get("/GetNotification",
    middlware.AuthToken,
    SettingController.GetNotificationSetting);


export default settingRouter;
