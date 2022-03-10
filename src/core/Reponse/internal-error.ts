import { ResponseStatus } from "./Models/RequestStatus";
import { StatusCode } from "./Models/StatusCode";
import ApiReponse from "./Response";

export class InternalError<T> extends ApiReponse {

    constructor(message: string) {
        super(ResponseStatus.INTERNAL_ERROR, message, false)
    }

}