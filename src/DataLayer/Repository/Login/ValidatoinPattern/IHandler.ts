
import { Locales } from "../../../../i18n/i18n-types";
import { IUserDoc } from "../../../Context/User/IUserDock";
import { ValidationContext } from "./ValidationContext";

export interface IHandler {
    setNext(lang:Locales, handler: IHandler): IHandler;

    handle(lang:Locales,request: IUserDoc): Promise<ValidationContext>;
}