import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * @Author Eslam
 * @desc sign token
 * @access private
 * @param {number} id
 * @returns {string} token
 */

export const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

/**
 * @Author Eslam
 * @desc verify token
 * @access private
 * @param {string} token
 * @returns {object} decoded token
 * @returns {object} error
 */

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return err;
        }
        return decoded;
    });
};
