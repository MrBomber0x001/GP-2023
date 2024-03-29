import prisma from "../config/prisma.js";
import {
    BadRequestError,
    NotFoundError,
    httpStatusCodes,
    UnAuthorizededError,
} from "../error/index.js";

export const createLaborService = async (req, res, next) => {
    try {
        const {
            name,
            desc,
            city,
            area,
            rateRange,
            availableDays,
            phone,
            catId,
            subCatId,
            userId,
        } = req.body;

        let rate = parseInt(req.body.rate);

        // Validate required fields
        if (!name) {
            throw new BadRequestError("Name is required!");
        }
        if (!desc) {
            throw new BadRequestError("Description is required!");
        }
        if (!city) {
            throw new BadRequestError("City is required!");
        }
        if (!area) {
            throw new BadRequestError("Area is required!");
        }
        if (!rateRange) {
            throw new BadRequestError("Rate Range is required!");
        }
        if (!availableDays) {
            throw new BadRequestError("Available Days is required!");
        }
        if (!phone) {
            throw new BadRequestError("Phone is required!");
        }
        if (!catId) {
            throw new BadRequestError("Category is required!");
        }
        if (!subCatId) {
            throw new BadRequestError("Sub-Category is required!");
        }
        if (!userId) {
            throw new BadRequestError("User is required!");
        }

        //Create service
        const service = await prisma.service.create({
            data: {
                name,
                desc,
                catId,
                subCatId,
                userId,
            },
        });

        // create labor service
        const laborService = await prisma.laborService.create({
            data: {
                city,
                area,
                rate,
                rateRange,
                availableDays,
                phone,
                serviceId: service.id,
            },
        });

        res.status(httpStatusCodes.CREATED).json({
            serviceId: laborService.id,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllLaborServices = async (req, res, next) => {
    try {
        const { city } = req.query;

        let laborServices = [];

        if (city) {
            laborServices = await prisma.laborService.findMany({
                where: {
                    city: city,
                },
                include: {
                    service: true,
                },
            });
        } else {
            laborServices = await prisma.laborService.findMany({
                include: {
                    service: true,
                },
            });
        }

        if (!laborServices) {
            throw new NotFoundError("No services found!");
        }

        // get all subCategories
        const subCategories = await prisma.sub_Category.findMany();

        // get all services with subCategories
        const servicesWithSubCategorys = laborServices.map((laborService) => {
            const subCategory = subCategories.find(
                (subCategory) =>
                    subCategory.id === laborService.service.subCatId
            );
            return {
                ...laborService,
                subCategory,
            };
        });

        res.status(httpStatusCodes.OK).json(servicesWithSubCategorys);
    } catch (error) {
        next(error);
    }
};

export const getLaborServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!id) {
            throw new BadRequestError("Id is required!");
        }

        const laborService = await prisma.laborService.findUnique({
            where: {
                id,
            },
            include: {
                service: true,
            },
        });

        if (!laborService) {
            throw new NotFoundError(`No service with id: ${id}`);
        }

        // get user info
        const user = await prisma.user.findUnique({
            where: { id: laborService.service.userId },
        });

        // get subCategory
        const subCategory = await prisma.sub_Category.findUnique({
            where: {
                id: laborService.service.subCatId,
            },
        });

        // service with subCategory
        const serviceWithSubCategory = {
            ...laborService,
            subCategory,
            user,
        };

        res.status(httpStatusCodes.OK).json(serviceWithSubCategory);

        res.status(httpStatusCodes.OK).json(laborService);
    } catch (error) {
        next(error);
    }
};

export const getLaborServicesByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!id) {
            throw new BadRequestError("User Id is required!");
        }

        // get services by user id and join with labor service
        const laborServices = await prisma.laborService.findMany({
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

        if (!laborServices) {
            throw new NotFoundError(`No service with for user id: ${id}`);
        }

        // get all subCategories
        const subCategories = await prisma.sub_Category.findMany();

        // get all services with subCategories
        const servicesWithSubCategorys = laborServices.map((laborService) => {
            const subCategory = subCategories.find(
                (subCategory) =>
                    subCategory.id === laborService.service.subCatId
            );
            return {
                ...laborService,
                subCategory,
            };
        });

        res.status(httpStatusCodes.OK).json(servicesWithSubCategorys);
    } catch (error) {
        next(error);
    }
};

export const updateLaborService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            name,
            desc,
            city,
            area,
            rateRange,
            availableDays,
            phone,
            catId,
            subCatId,
            userId,
        } = req.body;

        let rate = parseInt(req.body.rate);

        // Validate required fields
        if (!name) {
            throw new BadRequestError("Name is required!");
        }
        if (!desc) {
            throw new BadRequestError("Description is required!");
        }
        if (!city) {
            throw new BadRequestError("City is required!");
        }
        if (!area) {
            throw new BadRequestError("Area is required!");
        }
        if (!rateRange) {
            throw new BadRequestError("Rate Range is required!");
        }
        if (!availableDays) {
            throw new BadRequestError("Available Days is required!");
        }
        if (!phone) {
            throw new BadRequestError("Phone is required!");
        }
        if (!catId) {
            throw new BadRequestError("Category is required!");
        }
        if (!subCatId) {
            throw new BadRequestError("Sub-Category is required!");
        }
        if (!userId) {
            throw new BadRequestError("User is required!");
        }

        // Check for id
        if (!id) {
            throw new BadRequestError("Id is required!");
        }

        // Check if laborService exist
        const laborService = await prisma.laborService.findUnique({
            where: { id },
        });
        if (!laborService) {
            throw new NotFoundError(`No service with id: ${id}`);
        }

        // Check if service exist
        const service = await prisma.service.findUnique({
            where: { id: laborService.serviceId },
        });
        if (!service) {
            throw new BadRequestError(`No service with id: ${id}`);
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
            throw new BadRequestError("Sub-Category does not exist!");
        }

        // Check if user exist
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new BadRequestError("User does not exist!");
        }

        // check if the user is the owner of the laborService
        if (service.userId !== userId) {
            throw new UnAuthorizededError(
                "You are not authorized to delete this laborService!"
            );
        }

        // update service
        const updateService = await prisma.service.update({
            where: { id: laborService.serviceId },
            data: {
                name,
                desc,
            },
        });

        // update laborService
        const updateLaborService = await prisma.laborService.update({
            where: { id },
            data: {
                city,
                area,
                rate,
                rateRange,
                availableDays,
                phone,
            },
        });

        res.status(httpStatusCodes.OK).json({
            serviceId: updateLaborService.id,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteLaborService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check for id
        if (!id) {
            throw new BadRequestError("Id is required!");
        }

        // Check if laborService and service exist
        const laborService = await prisma.laborService.findUnique({
            where: { id },
        });
        const service = await prisma.service.findUnique({
            where: { id: laborService.serviceId },
        });
        if (!service || !laborService) {
            throw new NotFoundError("LaborService does not exist!");
        }

        // check if the user is the owner of the laborService
        if (service.userId !== userId) {
            throw new UnAuthorizededError(
                "You are not authorized to delete this laborService!"
            );
        }

        // delete laborService
        await prisma.laborService.delete({
            where: { id },
        });

        // delete service
        await prisma.service.delete({
            where: { id: laborService.serviceId },
        });

        res.status(httpStatusCodes.OK).json();
    } catch (error) {
        next(error);
    }
};

