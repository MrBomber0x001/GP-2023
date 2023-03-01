import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signToken } from "../utils/jwt.js";

dotenv.config();

/**
 * @Author Shefo
 * @desc ....
 * @access public
 * @endpoint POST `base/auth/register`
 */
export const signup = () => {
    //FIXME: fix this implementation - signup
};

// TODO: don't forget to do validation

/**
 * @Author Eslam
 * @desc Login user
 * @access public
 * @endpoint POST `base/auth/login`
 * @param {string} email
 * @param {string} password
 * @returns {object} user, token
 */

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate email and password are not empty
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email and password are required",
            });
        }

        // check if user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials",
            });
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials",
            });
        }

        // sign token
        const token = signToken(user.id);

        // return user and token
        return res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
