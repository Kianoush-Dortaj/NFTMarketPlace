import { BadRequestResponse } from "../Reponse/bad-request-error";
import { InternalError } from "../Reponse/internal-error";
import { IData } from "../Reponse/Models/IData";
import { SuccessDataResponse } from "../Reponse/success-data-response";
import { SuccessResponse } from "../Reponse/success-response";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';
import autoBind from 'auto-bind';
import AuthFailurError from "../Reponse/auth-failure-error";

export class ValidationResult {
    haveError: boolean;
    errorMessage: string[];

    constructor(haveError: boolean, errorMessage: string[]) {
        this.errorMessage = errorMessage;
        this.haveError = haveError;
    }
}

export class BaseController {

    constructor() {
        autoBind(this);
    }

    BadRerquest(res: Response, message: string) {
        return new BadRequestResponse(message).send(res);
    }

    AuthFailur(res: Response, message: string) {
        return new AuthFailurError(message).send(res);
    }

    InternalServerError(res: Response, message: string) {
        return new InternalError(message).send(res);
    }

    Ok(res: Response, message: string) {
        return new SuccessResponse(message).send(res);
    }

    Notfound(res: Response, message = "not Found") {
        return new BadRequestResponse(message).send(res);
    }

    OkObjectResult(res: Response, value: IData, message: string) {
        return new SuccessDataResponse(value, message).send(res);
    }

    OkObjectResultPager(res: Response, value: IData, message: string) {
        return new SuccessDataResponse(value, message).send(res);
    }

    async ValidationAction(req: Request, res: Response): Promise<ValidationResult> {

        const result = await validationResult(req);
        let messages: string[] = [];
        if (!result.isEmpty()) {
            if (messages !== undefined) {

                let errors = result.array();
                errors.forEach((element) => {

                    if (messages !== undefined) {

                        messages.push(element.msg);
                    }
                });
                return new ValidationResult(true, messages);
            }
        }
        return new ValidationResult(false, []);
    }

}