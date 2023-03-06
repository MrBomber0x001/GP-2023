import { CustomeAPIError } from "./customeError";
import { httpStatusCodes } from "./httpStatusCode";

export class NotFoundError extends CustomeAPIError {
    constructor(message) {
        super(message);
        this.statusCode = httpStatusCodes.NOT_FOUND;
    }
}

