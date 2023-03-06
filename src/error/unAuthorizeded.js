import { CustomeAPIError } from "./customeError.js";
import { httpStatusCodes } from "./httpStatusCode.js";

export class UnAuthorizededError extends CustomeAPIError {
    constructor(message) {
        super(message);
        this.statusCode = httpStatusCodes.UNAUTHORIZED;
    }
}

export default UnAuthorizededError;

