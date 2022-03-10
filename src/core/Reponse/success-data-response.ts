
import { Response } from 'express';
import { IData } from './Models/IData';
import { ResponseStatus } from './Models/RequestStatus';
import ApiReponse from './Response';

export class SuccessDataResponse<T> extends ApiReponse {
  
    constructor(result: IData, message :string) {
        super(ResponseStatus.SUCCESS, message, true, result);
    }

}