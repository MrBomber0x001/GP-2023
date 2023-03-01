import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signToken } from "../utils/jwt.js";
import { isEmailValid } from "../utils/helpers";

dotenv.config();

/**
 * @Author Shefo
 * @desc Signup handler
 * @access public
 * @endpoint POST `base/auth/register`
 * @returns {object} user, token
 */
export const signup = async (req, res) => {
    const { firstName, lastName, email, password, password2 } = req.body;
    const errors = [];

    // Check required fields
    if (!firstName || !lastName || !email || !password || !password2) {
        errors.push({ message: "Please fill in all fields!" });
    }

    // Check email  valid
    if (!isEmailValid(email)) {
        errors.push({ message: "Email not valid!" });
    }

    // Check password match
    if (password !== password2) {
        errors.push({ message: "Passwords do not match!" });
    }

    // Check passwprd length
    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters!" });
    }
    try {
        // Check for existing email
        //FIXME: change const to let, because you've changed it below!
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (user) {
            errors.push({ message: "email already exist!" });
        }

        if (errors.length > 0) {
            res.status(400).json(errors);
        } else {
            user = await prisma.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: bcrypt.hash(password, 10),
                },
            });

            //FIXME: You should sign in a token, with {id, role} and send it on the `res`
            res.status(200).json({ message: "User created" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
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

        // sign token with {id, role}
        const token = signToken(user.id, user.role);

        // return token
        return res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
