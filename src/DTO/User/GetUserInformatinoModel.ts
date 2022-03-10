import { Gender } from "./UpdateUserModel";

export interface GetUserInformationModel {
    firstName: string;
    id: string;
    gender?: Gender;
    lastName: string;
    hasAvatar:boolean;
}