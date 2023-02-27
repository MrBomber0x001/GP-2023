import jwt from 'jsonwebtoken'
import prisma from '../config/prisma';
import { ErrorResponse } from '../utils/createError';


export const verifyToken = async (req, res, next) => {
    try {
        const authToken = req.headers['authorization'];

        console.log(`authToken:`, authToken);

        const token = authToken ? authToken.split(' ')[1] : '';
        console.log(`token:`, token);

        const decoded = jwt.verify(token, "secret");

        let user;

        const { person } = decoded;

        if (person == 'reader') {
            user = await prisma.user.findUnique({
                where: {
                    id: decoded.id
                }
            })
        } else if (person == 'store') {
            user = await prisma.user.findUnique({
                where: {
                    id: decoded.id
                }
            })
        }
    } catch (e) {
        return next(new ErrorResponse(`You're not authroized`, 403));
    }
}

export const signToken = (obj) => {
    return jwt.sign(obj, "secret")
}