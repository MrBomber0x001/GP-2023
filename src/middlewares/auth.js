import { prisma } from "../config/prisma.js";
import { verifyToken } from "../utils/jwt";
import dotenv from "dotenv";
dotenv.config();

/**
 * @Author Eslam
 * @desc Check if user is authenticated
 * @access private
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 * @returns {object} next middleware
 * @returns {object} error
 */

const isAuthenticated = async (req, res, next) => {
    try {
        // get token from header
        const token = req.header("x-auth-token");

        // check if no token
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
        }

        // verify token
        const decoded = verifyToken(token);

        // check if token is invalid
        if (decoded instanceof Error) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
        }

        // check if user exists
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
        }

        // add user to request
        req.user = user;

        // call next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

/**
 * @author Eslam
 * @description Check if user is admin
 * @access private
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 * @returns {object} next middleware
 * @returns {object} error
 */

const isAdmin = async (req, res, next) => {
    try {
        // check if user is admin
        if (req.user.role !== "admin") {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
        }

        // call next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

module.exports = {
    isAdmin,
    isAuthenticated,
};

