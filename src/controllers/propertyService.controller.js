import prisma from "../config/prisma.js";
import {
    BadRequestError,
    NotFoundError,
    httpStatusCodes,
    InternalServerError,
} from "../error/index.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const createPropertyService = async (req, res, next) => {
    try {
        const {
            name,
            desc,
            catId,
            subCatId,
            userId,
            sellerCity,
            sellerArea,
            sellerStreet,
            LocLat,
            LocLng,
            isNegotiable,
        } = req.body;

        let { price } = req.body;

        price = parseFloat(price);

        // Validate required fields
        if (
            !name ||
            !desc ||
            !catId ||
            !subCatId ||
            !userId ||
            !sellerCity ||
            !sellerArea ||
            !price
        ) {
            throw new BadRequestError("fill in required fields!");
        }

        // validate catId
        const category = await prisma.category.findUnique({
            where: {
                id: catId,
            },
        });

        if (!category) {
            throw new NotFoundError(`category with id ${catId} not found!`);
        }

        // validate subCatId
        const subCategory = await prisma.subCategory.findUnique({
            where: {
                id: subCatId,
            },
        });

        if (!subCategory) {
            throw new NotFoundError(
                `sub category with id ${subCatId} not found!`
            );
        }

        // validate userId
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundError(`user with id ${userId} not found!`);
        }
        // get image path if exists
        const imagePath = req.file ? req.file.path : null;

        // get relative path if image path not null
        const imageRelativePath = imagePath
            ? path.relative(path.join(dirname, "../.."), imagePath)
            : null;

        console.log(imageRelativePath);

        // create new service
        const service = await prisma.service.create({
            data: {
                name,
                desc,
                catId,
                subCatId,
                userId,
            },
        });

        // create new property service

        const propertyService = await prisma.propertyService.create({
            data: {
                image: `/${imageRelativePath}`,
                price,
                sellerCity,
                sellerArea,
                sellerStreet,
                LocLat,
                LocLng,
                isNegotiable,
                serviceId: service.id,
            },
        });

        res.status(httpStatusCodes.CREATED).json({
            data: propertyService,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllPropertyServices = async (req, res, next) => {
    try {
        const propertyServices = await prisma.propertyService.findMany({
            include: {
                service: true,
            },
        });

        res.status(httpStatusCodes.OK).json({
            data: propertyServices,
        });
    } catch (error) {
        next(error);
    }
};

export const getPropertyServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const propertyService = await prisma.propertyService.findUnique({
            where: {
                id,
            },
            include: {
                service: true,
            },
        });

        if (!propertyService) {
            throw new NotFoundError(
                `property service with id ${id} not found!`
            );
        }

        res.status(httpStatusCodes.OK).json({
            data: propertyService,
        });
    } catch (error) {
        next(error);
    }
};

export const updateContractorService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            name,
            desc,
            catId,
            subCatId,
            userId,
            sellerCity,
            sellerArea,
            sellerStreet,
            LocLat,
            LocLng,
            isNegotiable,
        } = req.body;

        let { price } = req.body;

        price = parseFloat(price);

        // validate property service
        const propertyService = await prisma.propertyService.findUnique({
            where: {
                id,
            },
        });

        if (!propertyService) {
            throw new NotFoundError(
                `property service with id ${id} not found!`
            );
        }

        // Validate required fields
        if (
            !name ||
            !desc ||
            !catId ||
            !subCatId ||
            !userId ||
            !sellerCity ||
            !sellerArea ||
            !price
        ) {
            throw new BadRequestError("fill in required fields!");
        }

        // validate catId
        const category = await prisma.category.findUnique({
            where: {
                id: catId,
            },
        });

        if (!category) {
            throw new NotFoundError(`category with id ${catId} not found!`);
        }

        // validate subCatId
        const subCategory = await prisma.subCategory.findUnique({
            where: {
                id: subCatId,
            },
        });

        if (!subCategory) {
            throw new NotFoundError(
                `sub category with id ${subCatId} not found!`
            );
        }

        // validate userId
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundError(`user with id ${userId} not found!`);
        }

        // check if image is exists
        let imageRelativePath = propertyService.image;
        if (req.file) {
            // delete old image
            fs.unlinkSync(path.join(dirname, "../..", imageRelativePath));

            // get image path
            const newImagePath = req.file.path;

            // get relative path
            imageRelativePath = path.relative(
                path.join(dirname, "../.."),
                newImagePath
            );
        }

        console.log(imageRelativePath);

        // update service
        const service = await prisma.service.update({
            where: { id: propertyService.serviceId },
            data: {
                name,
                desc,
                catId,
                subCatId,
                userId,
            },
        });

        // update property service
        const updatedPropertyService = await prisma.propertyService.update({
            where: {
                id,
            },
            data: {
                image: `/${imageRelativePath}`,
                price,
                sellerCity,
                sellerArea,
                sellerStreet,
                LocLat,
                LocLng,
                isNegotiable,
                serviceId: service.id,
            },
        });

        res.status(httpStatusCodes.OK).json({
            data: propertyService,
        });
    } catch (error) {
        next(error);
    }
};
