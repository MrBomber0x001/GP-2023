import { httpStatusCodes } from "../error/httpStatusCode.js";

const errorHandlerMiddleware = (err, req, res, next) => {
    const customeError = {
        statusCode: err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR,
        message:
            err.message || "something went wrong, please try again later! ",
    };

    return res
        .status(customeError.statusCode)
        .json({ Error: customeError.message });
};

export default errorHandlerMiddleware;

