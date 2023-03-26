import { CustomeAPIError } from "./customeError.js";
import { httpStatusCodes } from "./httpStatusCode.js";

export class InternalServerError extends CustomeAPIError {
    constructor(message) {
        super(message);
        this.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    }
}

export default InternalServerError;
