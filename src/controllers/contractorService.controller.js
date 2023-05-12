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
        } = req.body;

        let { rate, experience, availabilityHours } = req.body;

        rate = parseFloat(rate);
        experience = parseInt(experience);
        availabilityHours = parseInt(availabilityHours);

        // Validate required fields
        if (
            !name ||
            !desc ||
            !availabilityRange ||
            !rateRange ||
            !email ||
            !phone ||
            !userId ||
            !catId ||
            !subCatId ||
            !rate ||
            !experience ||
            !availabilityHours
        ) {
            throw new BadRequestError("fill in required fields!");
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
        const subCat = await prisma.subCategory.findUnique({
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

        res.status(httpStatusCodes.CREATED).json({
            data: contractorService,
        });
    } catch (error) {
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
        const contractorServices = await prisma.contractorService.findMany({
            include: {
                service: true,
            },
        });

        res.status(httpStatusCodes.OK).json(contractorServices);
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

        res.status(httpStatusCodes.OK).json({
            data: contractorService,
        });
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
        } = req.body;

        let { rate, experience, availabilityHours } = req.body;

        rate = parseFloat(rate);
        experience = parseInt(experience);
        availabilityHours = parseInt(availabilityHours);

        // Validate contractorService
        const contractorService = await prisma.contractorService.findUnique({
            where: {
                id,
            },
        });

        if (!contractorService) {
            throw new NotFoundError("ContractorService not found!");
        }

        // Validate required fields
        if (
            !name ||
            !desc ||
            !availabilityRange ||
            !rateRange ||
            !email ||
            !phone ||
            !userId ||
            !catId ||
            !subCatId ||
            !rate ||
            !experience ||
            !availabilityHours
        ) {
            throw new BadRequestError("fill in required fields!");
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
        const subCat = await prisma.subCategory.findUnique({
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
            data: updatedContractorService,
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
