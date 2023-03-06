import { CustomeAPIError } from "./customeError.js";
import { httpStatusCodes } from "./httpStatusCode.js";

export class BadRequestError extends CustomeAPIError {
    constructor(message) {
        super(message);
        this.statusCode = httpStatusCodes.BAD_REQUEST;
    }
}

export default BadRequestError;

