
import { Response } from 'express';
import { ResponseStatus } from './Models/RequestStatus';
import ApiReponse from './Response';

export class NotFoundResponse<T> extends ApiReponse {

    constructor(message : string) {
        super(ResponseStatus.NOT_FOUND, message, true);
    }
}