import httpStatusCodes from "../error/httpStatusCode.js";

export const notFound = (req, res) => {
    res.status(httpStatusCodes.NOT_FOUND).json({
        message: "Route does not exist!",
    });
};

export default notFound;

