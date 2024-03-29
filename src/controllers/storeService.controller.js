import prisma from "../config/prisma.js";
import {
    BadRequestError,
    NotFoundError,
    httpStatusCodes,
} from "../error/index.js";
import { verifyToken } from "../utils/jwt.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * @Author Shefo
 * @desc  Service CRUD
 * @param {object} req, res , next
 */

export const createStoreService = async (req, res, next) => {
    try {
        const {
            name,
            desc,
            websitePage,
            city,
            area,
            street,
            locLat,
            locLng,
            availableDays,
            catId,
            subCatId,
            userId,
        } = req.body;

        let { rating, from, to } = req.body;
        from = parseInt(from);
        to = parseInt(to);
        rating = parseFloat(rating) || 0;

        // Validate required fields
        if (!name) {
            throw new BadRequestError("Name is required!");
        }
        if (!desc) {
            throw new BadRequestError("Description is required!");
        }
        if (!locLat) {
            throw new BadRequestError("Location latitude is required!");
        }
        if (!locLng) {
            throw new BadRequestError("Location longitude is required!");
        }
        if (!availableDays) {
            throw new BadRequestError("Available days is required!");
        }
        if (!from) {
            throw new BadRequestError("From is required!");
        }
        if (!to) {
            throw new BadRequestError("To is required!");
        }
        if (!catId) {
            throw new BadRequestError("Category is required!");
        }
        if (!subCatId) {
            throw new BadRequestError("SubCategory is required!");
        }
        if (!userId) {
            throw new BadRequestError("User is required!");
        }

        // Check if category exist
        const category = await prisma.category.findUnique({
            where: { id: catId },
        });
        if (!category) {
            throw new NotFoundError("Category not found!");
        }

        // Check if subCategory exist
        const subCategory = await prisma.Sub_Category.findUnique({
            where: { id: subCatId },
        });
        if (!subCategory) {
            throw new NotFoundError("SubCategory not found!");
        }

        // Check if user exist
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundError("User not found!");
        }

        // get image path if exists
        const imagePath = req.file ? req.file.path : null;

        // get relative path if image path not null
        const tempImageRelativePath = imagePath
            ? path.relative(path.join(dirname, "../.."), imagePath)
            : null;

        const imageRelativePath = tempImageRelativePath.replace("src", "");

        // create service
        const service = await prisma.service.create({
            data: {
                name,
                desc,
                catId,
                subCatId,
                userId,
            },
        });

        // create storeService
        const storeService = await prisma.storeService.create({
            data: {
                image: imageRelativePath,
                rating,
                websitePage,
                city,
                area,
                street,
                locLat,
                locLng,
                availableDays,
                from,
                to,
                serviceId: service.id,
            },
        });

        res.status(httpStatusCodes.CREATED).json({
            serviceId: storeService.id,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllStoreServices = async (req, res, next) => {
    try {
        const { city } = req.query;

        let storeServices = [];

        if (city) {
            storeServices = await prisma.storeService.findMany({
                where: {
                    city: city,
                },
                include: {
                    service: true,
                },
            });
        } else {
            storeServices = await prisma.storeService.findMany({
                include: {
                    service: true,
                },
            });
        }

        if (!storeServices) {
            throw new NotFoundError("No services found!");
        }

        // get all subcategory
        const subCategories = await prisma.sub_Category.findMany();

        // get all services with subCategories
        const servicesWithSubCategorys = storeServices.map((storeService) => {
            const subCategory = subCategories.find(
                (subCategory) =>
                    subCategory.id === storeService.service.subCatId
            );
            return {
                ...storeService,
                subCategory,
            };
        });

        res.status(httpStatusCodes.OK).json(servicesWithSubCategorys);
    } catch (error) {
        next(error);
    }
};

export const getStoreServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const storeService = await prisma.storeService.findUnique({
            where: { id },
            include: {
                service: true,
            },
        });

        if (!storeService) {
            throw new NotFoundError("StoreService not found!");
        }

        // get user info
        const user = await prisma.user.findUnique({
            where: { id: storeService.service.userId },
        });

        // get subCategory
        const subCategory = await prisma.sub_Category.findUnique({
            where: { id: storeService.service.subCatId },
        });

        // store with subCategory
        const serviceWithSubCategory = {
            ...storeService,
            subCategory,
            user,
        };

        res.status(httpStatusCodes.OK).json({
            serviceWithSubCategory,
        });
    } catch (error) {
        next(error);
    }
};

export const getStoreServicesByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!id) {
            throw new BadRequestError("User Id is required!");
        }

        // get services by user id and join with store service
        const storeServices = await prisma.storeService.findMany({
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

        if (!storeServices) {
            throw new NotFoundError(`No service with for user id: ${id}`);
        }

        // get all subcategory
        const subCategories = await prisma.sub_Category.findMany();

        // get all services with subCategories
        const servicesWithSubCategorys = storeServices.map((storeService) => {
            const subCategory = subCategories.find(
                (subCategory) =>
                    subCategory.id === storeService.service.subCatId
            );
            return {
                ...storeService,
                subCategory,
            };
        });

        res.status(httpStatusCodes.OK).json(servicesWithSubCategorys);
    } catch (error) {
        next(error);
    }
};

export const updateStoreService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            name,
            desc,
            websitePage,
            city,
            area,
            street,
            locLat,
            locLng,
            availableDays,
            catId,
            subCatId,
            userId,
        } = req.body;

        let { rating, from, to } = req.body;
        from = parseInt(from);
        to = parseInt(to);
        rating = parseFloat(rating) || 0;

        // Validate required fields
        if (!name) {
            throw new BadRequestError("Name is required!");
        }
        if (!desc) {
            throw new BadRequestError("Description is required!");
        }
        if (!locLat) {
            throw new BadRequestError("Location latitude is required!");
        }
        if (!locLng) {
            throw new BadRequestError("Location longitude is required!");
        }
        if (!availableDays) {
            throw new BadRequestError("Available days is required!");
        }
        if (!from) {
            throw new BadRequestError("From is required!");
        }
        if (!to) {
            throw new BadRequestError("To is required!");
        }
        if (!catId) {
            throw new BadRequestError("Category is required!");
        }
        if (!subCatId) {
            throw new BadRequestError("SubCategory is required!");
        }
        if (!userId) {
            throw new BadRequestError("User is required!");
        }

        // Check if storeService exist
        const storeService = await prisma.storeService.findUnique({
            where: { id },
        });
        if (!storeService) {
            throw new NotFoundError("StoreService does not exist!");
        }

        // Check if service exist
        const service = await prisma.service.findUnique({
            where: { id: storeService.serviceId },
        });
        if (!service) {
            throw new NotFoundError("StoreService does not exist!");
        }

        // Check if category exist
        const cat = await prisma.category.findUnique({
            where: { id: catId },
        });
        if (!cat) {
            throw new BadRequestError("Category does not exist!");
        }

        // Check if subCategory exist
        const subCat = await prisma.sub_Category.findUnique({
            where: { id: subCatId },
        });
        if (!subCat) {
            throw new BadRequestError("SubCategory does not exist!");
        }

        // Check if user exist
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new BadRequestError("User does not exist!");
        }

        // check if the user is the owner of the storeService
        if (service.userId !== userId) {
            throw new UnauthorizedError(
                "You are not authorized to update this storeService!"
            );
        }

        // check if image is exists
        let imageRelativePath = storeService.image;
        if (req.file) {
            // delete old image
            fs.unlinkSync(path.join(dirname, "../..", storeService.image));

            // get image path
            const newImagePath = req.file.path;

            // get relative path
            const tempImageRelativePath = path.relative(
                path.join(dirname, "../.."),
                newImagePath
            );

            imageRelativePath = tempImageRelativePath.replace("src", "");
        }

        console.log(imageRelativePath);

        // update service
        const updatedService = await prisma.service.update({
            where: { id: service.id },
            data: {
                name,
                desc,
            },
        });

        // update storeService
        const updatedStoreService = await prisma.storeService.update({
            where: { id },
            data: {
                image: imageRelativePath,
                rating,
                websitePage,
                city,
                area,
                street,
                locLat,
                locLng,
                availableDays,
                from,
                to,
            },
        });

        res.status(httpStatusCodes.OK).json({
            storeServicee: updatedStoreService,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteStoreService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if storeService and service exist
        const storeService = await prisma.storeService.findUnique({
            where: { id },
        });
        if (!storeService) {
            throw new NotFoundError("StoreService does not exist!");
        }

        // Check if service exist
        const service = await prisma.service.findUnique({
            where: { id: storeService.serviceId },
        });
        if (!service) {
            throw new NotFoundError("StoreService does not exist!");
        }

        // check if the user is the owner of the storeService
        if (service.userId !== userId) {
            throw new UnauthorizedError(
                "You are not authorized to delete this storeService!"
            );
        }

        // delete storeService
        await prisma.storeService.delete({
            where: { id },
        });

        // delete service
        await prisma.service.delete({
            where: { id: storeService.serviceId },
        });

        // delete store image from server
        fs.unlinkSync(path.join(dirname, "../..", storeService.image));

        res.status(httpStatusCodes.OK).json();
    } catch (error) {
        next(error);
    }
};

