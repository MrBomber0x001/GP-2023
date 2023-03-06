import { CustomeAPIError } from "./customeError.js";
import { httpStatusCodes } from "./httpStatusCode.js";

export class NotFoundError extends CustomeAPIError {
    constructor(message) {
        super(message);
        this.statusCode = httpStatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;

