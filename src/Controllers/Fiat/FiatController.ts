import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';
import { cplayCplClientService } from '../../grpc/services/CpayCPL.grpc.service';
import OperationResult from '../../core/Operation/OperationResult';
import { OperationStatus } from '../../grpc/models/CpayCPL';
import { InternalServerError } from '../../core/ErrorHandler/DatabaseConectionError';

export default new class FiatCurrencyController extends BaseController {

    constructor() {
        super();
    }


    async GetAllFiatCurrencySelect(req: Request, res: Response, next: NextFunction) {

        try {
            let validationData = await this.ValidationAction(req, res);

            if (!validationData.haveError) {

                const getAllFiatCurrencySelectFiatCurrency = await cplayCplClientService.getAllFiatCurrencySelectedList({});

                if (getAllFiatCurrencySelectFiatCurrency.operationStatus == OperationStatus.SUCCESS) {
                    return this.OkObjectResult(res, {
                        data: getAllFiatCurrencySelectFiatCurrency.result
                    }, "");

                }
                next(new InternalServerError(getAllFiatCurrencySelectFiatCurrency.operationMessage))

            } else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        } catch (error: any) {
            next(new InternalServerError(error.message))
        }

    }


}