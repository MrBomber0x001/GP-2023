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
    if (req.user.role === "admin") {
        next();
    } else {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized",
        });
    }
};

module.exports = {
    isAdmin,
};
