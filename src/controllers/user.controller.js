import prisma from "../config/prisma.js";
import {
    BadRequestError,
    NotFoundError,
    httpStatusCodes,
} from "../error/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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

export const updateUserById = async (req, res, next) => {
    try {
        const loggedUser = req.user;

        const id = req.params.id;

        if (!id) {
            throw new BadRequestError("id is required");
        }

        if (loggedUser.id !== id) {
            throw new BadRequestError("you can't access this user");
        }

        const { fistName, lastName, email, password, location, phone } =
            req.body;

        // validate fistName
        if (!fistName) {
            throw new BadRequestError("fistName is required");
        }

        // validate lastName
        if (!lastName) {
            throw new BadRequestError("lastName is required");
        }

        // validate email
        if (!email) {
            throw new BadRequestError("email is required");
        }

        // validate password
        if (!password) {
            throw new BadRequestError("password is required");
        }

        // check if user exist
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new NotFoundError(`user with id ${id} not found`);
        }

        // check if image is exists
        let imageRelativePath = user.image;
        if (req.file) {
            // delete old image
            fs.unlinkSync(path.join(dirname, "../..", user.image));

            // get image path
            const newImagePath = req.file.path;

            // get relative path
            const tempImageRelativePath = path.relative(
                path.join(dirname, "../.."),
                newImagePath
            );

            imageRelativePath = tempImageRelativePath.replace("src", "");
        }

        // update user
        const updatedUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                fistName,
                lastName,
                email,
                password,
                location,
                phone,
                image: imageRelativePath,
            },
        });

        res.status(httpStatusCodes.OK).json({
            updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

