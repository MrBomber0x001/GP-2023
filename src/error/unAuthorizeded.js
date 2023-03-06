import { CustomeAPIError } from "./customeError";
import { httpStatusCodes } from "./httpStatusCode";

export class UnAuthorizededError extends CustomeAPIError {
    constructor(message) {
        super(message);
        this.statusCode = httpStatusCodes.UNAUTHORIZED;
    }
}

