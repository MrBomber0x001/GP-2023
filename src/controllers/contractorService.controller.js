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

/**
 * @Author Eslam
 * @desc  Service CRUD
 * @param {object} req, res , next
 */

export const createContractorService = async (req, res, next) => {
    try {
        const {
            name,
            desc,
            city,
            availabilityRange,
            rateRange,
            email,
            phone,
            userId,
            catId,
            subCatId,
            rate,
            experience,
            availabilityHours,
        } = req.body;

        // validate required fields
        if (!name) {
            throw new BadRequestError("name is required!");
        }

        if (!desc) {
            throw new BadRequestError("desc is required!");
        }

        if (!experience) {
            throw new BadRequestError("experience is required!");
        }

        if (!availabilityHours) {
            throw new BadRequestError("availabilityHours is required!");
        }

        if (!availabilityRange) {
            throw new BadRequestError("availabilityRange is required!");
        }

        if (!rateRange) {
            throw new BadRequestError("rateRange is required!");
        }

        if (!email) {
            throw new BadRequestError("email is required!");
        }

        if (!phone) {
            throw new BadRequestError("phone is required!");
        }

        if (!userId) {
            throw new BadRequestError("userId is required!");
        }

        if (!catId) {
            throw new BadRequestError("catId is required!");
        }

        if (!subCatId) {
            throw new BadRequestError("subCatId is required!");
        }

        if (!rate) {
            throw new BadRequestError("rate is required!");
        }

        // Validate email
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailRegex.test(email)) {
            throw new BadRequestError("Invalid email!");
        }

        // Validate rate
        if (rate < 0 || rate > 5) {
            throw new BadRequestError("Invalid rate!");
        }

        // Validate experience
        if (experience < 0) {
            throw new BadRequestError("Invalid experience!");
        }

        // Validate availabilityHours
        if (availabilityHours < 0 || availabilityHours > 24) {
            throw new BadRequestError("Invalid availabilityHours!");
        }

        // Validate catId
        const cat = await prisma.category.findUnique({
            where: {
                id: catId,
            },
        });

        if (!cat) {
            throw new BadRequestError("Invalid catId!");
        }

        // Validate subCatId
        const subCat = await prisma.sub_Category.findUnique({
            where: {
                id: subCatId,
            },
        });

        if (!subCat) {
            throw new BadRequestError("Invalid subCatId!");
        }

        // Validate userId
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        console.log(user);

        if (!user) {
            throw new BadRequestError("Invalid userId!");
        }

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

        console.log(service);

        // create contractorService
        const contractorService = await prisma.contractorService.create({
            data: {
                rate,
                experience,
                availabilityHours,
                availabilityRange,
                rateRange,
                email,
                phone,
                serviceId: service.id,
                city,
            },
        });

        console.log(contractorService);

        res.status(httpStatusCodes.CREATED).json({
            data: contractorService,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * @Author Eslam
 * @desc  Get all contractorServices
 * @param {object} req, res , next
 */

export const getAllContractorServices = async (req, res, next) => {
    try {
        const { city } = req.query;
        let contractorServices = [];

        if (city) {
            contractorServices = await prisma.contractorService.findMany({
                where: {
                    city: city,
                },
                include: {
                    service: true,
                },
            });
        } else {
            contractorServices = await prisma.contractorService.findMany({
                include: {
                    service: true,
                },
            });
        }

        if (!contractorServices) {
            throw new NotFoundError("No services found!");
        }

        // get all subCategories
        const subCategories = await prisma.sub_Category.findMany();

        // get all services with subCategories
        const servicesWithSubCategorys = contractorServices.map(
            (contractorService) => {
                const subCategory = subCategories.find(
                    (subCategory) =>
                        subCategory.id === contractorService.service.subCatId
                );
                return {
                    ...contractorService,
                    subCategory,
                };
            }
        );

        res.status(httpStatusCodes.OK).json(servicesWithSubCategorys);
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Eslam
 * @desc  Get contractorService by id
 * @param {object} req, res , next
 * @param {string} id
 */

export const getContractorServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError("id is required!");
        }

        const contractorService = await prisma.contractorService.findUnique({
            where: {
                id,
            },
            include: {
                service: true,
            },
        });

        if (!contractorService) {
            throw new NotFoundError("ContractorService not found!");
        }

        // get subCategory
        const subCategory = await prisma.sub_Category.findUnique({
            where: { id: contractorService.service.subCatId },
        });

        // contractor with subCategory
        const serviceWithSubCategory = {
            ...contractorService,
            subCategory,
        };

        res.status(httpStatusCodes.OK).json({
            serviceWithSubCategory,
        });
    } catch (error) {
        next(error);
    }
};

export const getContractorServicesByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!id) {
            throw new BadRequestError("User Id is required!");
        }

        // get services by user id and join with contractor service
        const contractorService = await prisma.contractorService.findMany({
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

        if (!contractorService) {
            throw new NotFoundError(`No service with for user id: ${id}`);
        }

        // get all subCategories
        const subCategories = await prisma.sub_Category.findMany();

        // get all services with subCategories
        const servicesWithSubCategorys = contractorServices.map(
            (contractorService) => {
                const subCategory = subCategories.find(
                    (subCategory) =>
                        subCategory.id === contractorService.service.subCatId
                );
                return {
                    ...contractorService,
                    subCategory,
                };
            }
        );

        res.status(httpStatusCodes.OK).json(servicesWithSubCategorys);
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Eslam
 * @desc  update contractorService by id
 * @param {object} req, res , next
 * @param {string} id
 */

export const updateContractorService = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError("id is required!");
        }

        const {
            name,
            desc,
            city,
            availabilityRange,
            rateRange,
            email,
            phone,
            userId,
            catId,
            subCatId,
            rate,
            experience,
            availabilityHours,
        } = req.body;

        // Validate contractorService
        const contractorService = await prisma.contractorService.findUnique({
            where: {
                id,
            },
        });

        if (!contractorService) {
            throw new NotFoundError("ContractorService not found!");
        }

        // validate required fields
        if (!name) {
            throw new BadRequestError("name is required!");
        }

        if (!desc) {
            throw new BadRequestError("desc is required!");
        }

        if (!experience) {
            throw new BadRequestError("experience is required!");
        }

        if (!availabilityHours) {
            throw new BadRequestError("availabilityHours is required!");
        }

        if (!availabilityRange) {
            throw new BadRequestError("availabilityRange is required!");
        }

        if (!rateRange) {
            throw new BadRequestError("rateRange is required!");
        }

        if (!email) {
            throw new BadRequestError("email is required!");
        }

        if (!phone) {
            throw new BadRequestError("phone is required!");
        }

        if (!userId) {
            throw new BadRequestError("userId is required!");
        }

        if (!catId) {
            throw new BadRequestError("catId is required!");
        }

        if (!subCatId) {
            throw new BadRequestError("subCatId is required!");
        }

        if (!rate) {
            throw new BadRequestError("rate is required!");
        }

        // Validate email
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailRegex.test(email)) {
            throw new BadRequestError("Invalid email!");
        }

        // Validate experience
        if (experience < 0) {
            throw new BadRequestError("Invalid experience!");
        }

        // Validate availabilityHours
        if (availabilityHours < 0 || availabilityHours > 24) {
            throw new BadRequestError("Invalid availabilityHours!");
        }

        // Validate catId
        const cat = await prisma.category.findUnique({
            where: {
                id: catId,
            },
        });

        if (!cat) {
            throw new BadRequestError("Invalid catId!");
        }

        // Validate subCatId
        const subCat = await prisma.sub_Category.findUnique({
            where: {
                id: subCatId,
            },
        });

        if (!subCat) {
            throw new BadRequestError("Invalid subCatId!");
        }

        // Validate userId
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new BadRequestError("Invalid userId!");
        }

        // check if service exists
        const serviceExists = await prisma.service.findUnique({
            where: {
                id: contractorService.serviceId,
            },
        });

        if (!serviceExists) {
            throw new NotFoundError("Service not found!");
        }

        // check if user owns the service
        if (serviceExists.userId !== userId) {
            throw new UnAuthorizededError("You don't own this service!");
        }

        // update service
        const service = await prisma.service.update({
            where: {
                id: contractorService.serviceId,
            },
            data: {
                name,
                desc,
                catId,
                subCatId,
                userId,
            },
        });

        // update contractorService
        const updatedContractorService = await prisma.contractorService.update({
            where: {
                id,
            },
            data: {
                rate,
                experience,
                availabilityHours,
                availabilityRange,
                rateRange,
                email,
                phone,
                serviceId: service.id,
                city,
            },
        });

        res.status(httpStatusCodes.OK).json({
            id: updatedContractorService.id,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Eslam
 * @desc  delete contractorService by id
 * @param {object} req, res , next
 * @param {string} id
 */

export const deleteContractorService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        if (!id) {
            throw new BadRequestError("id is required!");
        }

        // check if contractorService and service exist
        const contractorService = await prisma.contractorService.findUnique({
            where: {
                id,
            },
        });

        const service = await prisma.service.findUnique({
            where: {
                id: contractorService.serviceId,
            },
        });

        if (!contractorService || !service) {
            throw new NotFoundError("ContractorService not found!");
        }

        // check if user is authorized
        if (service.userId !== userId) {
            throw new UnauthorizedError("You are not authorized!");
        }

        // delete contractorService
        await prisma.contractorService.delete({
            where: {
                id,
            },
        });

        // delete service
        await prisma.service.delete({
            where: {
                id: contractorService.serviceId,
            },
        });

        res.status(httpStatusCodes.OK).json({
            data: contractorService,
        });
    } catch (error) {
        next(error);
    }
};

