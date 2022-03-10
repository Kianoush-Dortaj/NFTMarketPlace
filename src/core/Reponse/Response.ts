import { Response } from 'express';
import { IData } from './Models/IData';
import { ResponseStatus } from './Models/RequestStatus';

export default abstract class ApiReponse {

    constructor(
        protected status: ResponseStatus,
        protected message: string,
        protected success: boolean,
        protected result?: IData
    ) {
    }

    protected prepare<T extends ApiReponse>(res: Response, response: T): Response {
        return res.status(this.status).json(ApiReponse.sanitize(response));
    }

    public send(res: Response): Response {
        return this.prepare<ApiReponse>(res, this);
    }

    private static sanitize<T extends ApiReponse>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);
        // delete {some_field};
        // delete clone.Status;

        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
        return clone;
    }

}