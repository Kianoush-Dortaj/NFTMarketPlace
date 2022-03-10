import { Locales } from "../../i18n/i18n-types";

export interface ReigsterUserModel {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    lang:Locales;
}