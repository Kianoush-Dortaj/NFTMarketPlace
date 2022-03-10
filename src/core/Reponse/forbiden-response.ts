import { ResponseStatus } from "./Models/RequestStatus";
import ApiReponse from "./Response";


export class ForbiddenResponse<T> extends ApiReponse {
  constructor(message: string) {
    super(ResponseStatus.FORBIDDEN, message, false);
  }
}