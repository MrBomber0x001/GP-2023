import prisma from "../../config/prisma.js";
import {
    BadRequestError,
    NotFoundError,
    httpStatusCodes,
    InternalServerError,
} from "../../error/index.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({});

        res.status(httpStatusCodes.OK).json({
            users,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        // validate id
        const id = req.params.id;

        if (!id) {
            throw new BadRequestError("id is required");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new NotFoundError(`user with id ${id} not found`);
        }

        res.status(httpStatusCodes.OK).json({
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw new BadRequestError("id is required");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new NotFoundError(`user with id ${id} not found`);
        }

        // before deleting user, delete all the services of the user
        const services = await prisma.service.findMany({
            where: {
                userId: id,
            },
        });

        if (services.length > 0) {
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: id,
            },
        });

        res.status(httpStatusCodes.NO_CONTENT).json({});
    } catch (error) {
        next(error);
    }
};

