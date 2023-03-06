import { CustomeAPIError } from "./customeError";
import { httpStatusCodes } from "./httpStatusCode";

export class BadRequestError extends CustomeAPIError {
    constructor(message) {
        super(message);
        this.statusCode = httpStatusCodes.BAD_REQUEST;
    }
}

