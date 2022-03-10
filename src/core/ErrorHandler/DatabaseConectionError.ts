
import { WinstonLogger } from "../../utiles/logger/winston/WinstonLogger";
import { BaseError } from "./BaseError";

export class InternalServerError extends BaseError {
    statusCode = 500;

    constructor(message: string) {

        super(message);

        WinstonLogger.logger.error(message);
        Object.setPrototypeOf(this, InternalServerError.prototype);

    }
    serializeErrors() {
        return [
            {
                message: "Error connecting to database",
            },
        ];
    }
}