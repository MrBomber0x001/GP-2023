import prisma from "../config/prisma.js";
import {
    BadRequestError,
    NotFoundError,
    httpStatusCodes,
    InternalServerError,
    UnAuthorizededError,
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
            locLat,
            locLng,
        } = req.body;

        let { price, isNegotiable } = req.body;

        price = parseFloat(price);
        isNegotiable = Boolean(isNegotiable);

        // Validate required fields

        if (!name) {
            throw new BadRequestError("name is required!");
        }

        if (!desc) {
            throw new BadRequestError("desc is required!");
        }

        if (!catId) {
            throw new BadRequestError("catId is required!");
        }

        if (!subCatId) {
            throw new BadRequestError("subCatId is required!");
        }

        if (!userId) {
            throw new BadRequestError("userId is required!");
        }

        if (!sellerCity) {
            throw new BadRequestError("sellerCity is required!");
        }

        if (!sellerArea) {
            throw new BadRequestError("sellerArea is required!");
        }

        if (!price) {
            throw new BadRequestError("price is required!");
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
        const subCategory = await prisma.sub_Category.findUnique({
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
                locLat,
                locLng,
                isNegotiable,
                serviceId: service.id,
            },
        });

        res.status(httpStatusCodes.CREATED).json({
            data: propertyService,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllPropertyServices = async (req, res, next) => {
    try {
        const { city } = req.query;

        let propertyServices = [];

        if (city) {
            propertyServices = await prisma.propertyService.findMany({
                where: {
                    city: city,
                },
                include: {
                    service: true,
                },
            });
        } else {
            propertyServices = await prisma.propertyService.findMany({
                include: {
                    service: true,
                },
            });
        }

        if (!propertyServices) {
            throw new NotFoundError("No services found!");
        }

        res.status(httpStatusCodes.OK).json(propertyServices);
    } catch (error) {
        next(error);
    }
};

export const getPropertyServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError("id is required!");
        }

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
                `property service with id: ${id} not found!`
            );
        }

        res.status(httpStatusCodes.OK).json({
            data: propertyService,
        });
    } catch (error) {
        next(error);
    }
};

export const getPropertyServicesByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!id) {
            throw new BadRequestError("User Id is required!");
        }

        // get services by user id and join with property service
        const propertyService = await prisma.propertyService.findMany({
            where: {
                service: {
                    user: {
                        id: id,
                    },
                },
            },
            include: {
                service: true,
            },
        });

        if (!propertyService) {
            throw new NotFoundError(`No service with for user id: ${id}`);
        }

        res.status(httpStatusCodes.OK).json(propertyService);
    } catch (error) {
        next(error);
    }
};

export const updatePropertyService = async (req, res, next) => {
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
        } = req.body;

        let { price, isNegotiable } = req.body;

        price = parseFloat(price);
        isNegotiable = Boolean(isNegotiable);
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

        if (!name) {
            throw new BadRequestError("name is required!");
        }

        if (!desc) {
            throw new BadRequestError("desc is required!");
        }

        if (!catId) {
            throw new BadRequestError("catId is required!");
        }

        if (!subCatId) {
            throw new BadRequestError("subCatId is required!");
        }

        if (!userId) {
            throw new BadRequestError("userId is required!");
        }

        if (!sellerCity) {
            throw new BadRequestError("sellerCity is required!");
        }

        if (!sellerArea) {
            throw new BadRequestError("sellerArea is required!");
        }

        if (!price) {
            throw new BadRequestError("price is required!");
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
        const subCategory = await prisma.sub_Category.findUnique({
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
            imageRelativePath = `/${path.relative(
                path.join(dirname, "../.."),
                newImagePath
            )}`;
        }

        console.log(imageRelativePath);

        // check if user is the owner of the service

        const service = await prisma.service.findUnique({
            where: {
                id: propertyService.serviceId,
            },
        });

        if (!service) {
            throw new NotFoundError(
                `service with id ${propertyService.serviceId} not found!`
            );
        }

        if (service.userId !== userId) {
            throw new UnAuthorizededError(
                `user with id ${userId} is not the owner of the service!`
            );
        }

        // update service
        const Updatedservice = await prisma.service.update({
            where: { id: propertyService.serviceId },
            data: {
                name,
                desc,
            },
        });

        // update property service
        const updatedPropertyService = await prisma.propertyService.update({
            where: {
                id,
            },
            data: {
                image: imageRelativePath,
                price,
                sellerCity,
                sellerArea,
                sellerStreet,
                LocLat,
                LocLng,
                isNegotiable,
            },
        });

        res.status(httpStatusCodes.OK).json({
            serviceId: updatedPropertyService.id,
        });
    } catch (error) {
        next(error);
    }
};

// delete property service
export const deletePropertyService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        if (!id) {
            throw new BadRequestError("id is required!");
        }

        const propertyService = await prisma.propertyService.findUnique({
            where: {
                id,
            },
        });

        const service = await prisma.service.findUnique({
            where: {
                id: propertyService.serviceId,
            },
        });

        if (!propertyService || !service) {
            throw new NotFoundError(
                `property service with id ${id} not found!`
            );
        }

        // check if user is the owner of the service

        if (service.userId !== userId) {
            throw new UnAuthorizededError(
                `user with id ${userId} is not the owner of the service!`
            );
        }

        // delete property service
        await prisma.propertyService.delete({
            where: {
                id,
            },
        });

        // delete service
        await prisma.service.delete({
            where: {
                id: service.id,
            },
        });

        res.status(httpStatusCodes.OK).json({
            data: propertyService,
        });
    } catch (error) {
        next(error);
    }
};
