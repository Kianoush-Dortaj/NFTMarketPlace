import { ResponseStatus } from "./Models/RequestStatus";
import ApiReponse from "./Response";

export class SuccessResponse<T> extends ApiReponse {
    constructor(message:string) {
      super(ResponseStatus.SUCCESS, message, true);
    }
  }