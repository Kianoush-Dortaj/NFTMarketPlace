import { IData } from "./Models/IData";
import { ResponseStatus } from "./Models/RequestStatus";
import ApiReponse from "./Response";

export default class AuthFailurError extends ApiReponse {

    constructor(message: string) {
        super(ResponseStatus.UNAUTHORIZED, message, false)
    }

}