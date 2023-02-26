

import prisma from "../config/prisma.js";

//TODO: validate the input
/**
 * @author Meska 
 * @desc [POST] user signup 
 * @access public
 */
export const signup = async (req, res) => {
    // const { firstname, lastname, email, password } = req.body;
    const userExist = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })

    if (userExist) {
        return res.send({ message: `user already exist!`, statusCode: 404, data: [] });
    }
    console.log(userExist);
    const newUser = await prisma.user.create({
        data: {
            ...req.body
        }
    })
    return res.send({ data: newUser, message: `user has been created successfully`, statusCode: 201 })
}

/**
 *
 * @author Meska
 * @description user signin
 * @route [POST] `/v1/auth/login`
 * @access public
 */
export const signIn = async (req, res) => {
    const doesExist = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })
    if (!doesExist) {
        return res.send({ message: `wrong Email/Password`, data: [], statusCode: 404 })
    }

    return res.send({ message: 'here you are', data: doesExist, statusCode: 200 })
}


