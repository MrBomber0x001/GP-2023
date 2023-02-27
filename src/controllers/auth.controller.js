
import bcrypt from 'bcrypt'
import prisma from "../config/prisma.js";
import { signToken } from '../middlewares/jwt.js';
import { ErrorResponse } from '../utils/createError.js';
//TODO: validate the input
/**
 * @author Meska 
 * @desc [POST] user signup 
 * @access public
 */
export const signup = async (req, res, next) => {
    try {
        // const { firstname, lastname, email, password } = req.body;
        const doesExist = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })

        if (doesExist) {
            return res.status(400).send({ message: `user already exist!`, data: [] });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                ...req.body,
                password: hashedPassword
            }
        })

        const token = signToken(newUser.id)
        return res.status(201).send({ success: true, token })
    } catch (error) {
        return next(new ErrorResponse(`Something bad happended: ${error.message}`, 500));
    }
}

/**
 *
 * @author Meska
 * @description user signin
 * @route [POST] `/v1/auth/login`
 * @access public
 */
export const signIn = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            return res.status(404).send({ message: `user is not found!`, data: [] })
        }

        // check for password validity
        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res.status(400).json({ success: false, message: 'email/password are invalid!' })
        }

        // Sign a tokne
        let userObj = {
            id: user.id,
            role: user.role
        }
        const token = signToken(userObj)

        return res.status(200).send({ message: 'Logged In successfully', data: user, token })
    } catch (error) {
        return next(new ErrorResponse(`Something bad happened: ${error.messag}`, 500))
    }
}


export const resetPassword = async (req, res) => {

}