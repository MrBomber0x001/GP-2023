import prisma from "../config/prisma.js";
import { verifyToken } from "../utils/jwt.js";
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

export const isAuthenticated = async (req, res, next) => {
    try {
        // get token from header
        const token = req.header("x-auth-token");

        // check if no token
        if (!token) {
            throw new UnAuthorizededError("Invalid Credentials!");
        }

        // verify token
        const decoded = verifyToken(token);

        // check if token is invalid
        if (decoded instanceof Error) {
            throw new UnAuthorizededError("Unauthorized!");
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
        console.log(error);
        next(error);
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

export const isAdmin = async (req, res, next) => {
    try {
        // check if user is admin
        if (req.user.role !== "ADMIN") {
            throw new UnAuthorizededError("Unauthorized!");
        }

        // call next middleware
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
