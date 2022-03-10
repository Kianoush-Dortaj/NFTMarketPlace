
import { Locales } from "../../../../i18n/i18n-types";
import { IUserDoc } from "../../../Context/User/IUserDock";
import { IHandler } from "./IHandler";
import { ValidationContext } from "./ValidationContext";

export abstract class Handler implements IHandler {

    private nextHandler!: IHandler;

    setNext(lang: Locales, handler: IHandler): IHandler {
        this.nextHandler = handler;

        return this.nextHandler;
    }

    async handle(lang: Locales, request: IUserDoc): Promise<ValidationContext> {
        if (this.nextHandler) {
            return this.nextHandler.handle(lang, request);
        }
        return {
            Context: {
                hash: '',
                isTowfactor: false,
                isGoogle2FA: false,
                token: ''
            },
            HaveError: false,
            Message: ''
        };
    }




}