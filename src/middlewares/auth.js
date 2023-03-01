/**
 * @author Eslam
 * @description Check if user is admin
 * @access private
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */

const isAdmin = (req, res, next) => {
    // check if user is admin
    if (req.user.role !== "admin") {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized",
        });
    }

    // serialize user info into reqeust object
    req.user = {
        id: req.user.id,
        role: req.user.role,
    };

    // call next middleware
    next();
};

module.exports = {
    isAdmin,
};
