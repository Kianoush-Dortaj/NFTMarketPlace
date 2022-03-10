import { ResponseStatus } from "./Models/RequestStatus";
import ApiReponse from "./Response";


export class DatabaseConnectionResponse<T> extends ApiReponse {
    constructor(message: string) {
        super(ResponseStatus.INTERNAL_ERROR, message, false);
    }
}