import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signToken } from "../utils/jwt.js";
import { isEmailValid } from "../validations/auth.validation.js";
import {
    BadRequestError,
    UnAuthorizededError,
    httpStatusCodes,
} from "../error/index.js";

dotenv.config();

/**
 * @Author Shefo
 * @desc Signup handler
 * @access public
 * @endpoint POST `base/auth/register`
 * @returns {object} user, token
 */
export const signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check required fields
        if (!firstName || !lastName || !email || !password) {
            throw new BadRequestError("Please fill in required fields!");
        }

        // Check email  valid
        if (!isEmailValid(email)) {
            throw new BadRequestError("Email not valid!");
        }

        // Check passwprd length
        if (password.length < 6) {
            throw new BadRequestError(
                "Password should be at least 6 characters!"
            );
        }

        // Check for existing email
        //Done => FIXME: change const to let, because you've changed it below!
        let user = await prisma.user.findUnique({ where: { email: email } });
        console.log(user);
        if (user) {
            throw new BadRequestError("Email already exist!");
        }

        user = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: (await bcrypt.hash(password, 10)).toString(),
            },
        });

        //Done => FIXME: You should sign in a token, with {id, role} and send it on the `res`
        const token = signToken(user.id, user.role);
        res.status(httpStatusCodes.OK).json({
            message: "User created",
            token: token,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Eslam
 * @desc Login user
 * @access public
 * @endpoint POST `base/auth/login`
 * @param {string} email
 * @param {string} password
 * @returns {object} token
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // validate email and password are not empty
        if (!email || !password) {
            throw new BadRequestError("Email and password are required!");
        }

        // check if user exists
        const user = await prisma.user.findUnique({ where: { email } });
        console.log(user);
        if (!user) {
            throw new UnAuthorizededError("Invalid Credentials user!");
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new UnAuthorizededError("Invalid Credentials!");
        }

        // sign token with {id, role}
        const token = signToken(user.id, user.role);

        // return token
        return res.status(httpStatusCodes.OK).json({
            message: "Logged in successfully",
            token,
        });
    } catch (error) {
        next(error);
    }
};

