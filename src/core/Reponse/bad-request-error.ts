import { ResponseStatus } from "./Models/RequestStatus";
import ApiReponse from "./Response";

export class BadRequestResponse<T> extends ApiReponse {
    constructor(message: string) {
        super(ResponseStatus.BAD_REQUEST, message, false);
    }
}