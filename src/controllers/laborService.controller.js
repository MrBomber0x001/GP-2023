import prisma from "../config/prisma.js";
import {
    BadRequestError,
    NotFoundError,
    httpStatusCodes,
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

        let { rate } = parseInt(req.body);
        rate = parseInt(rate);

        // Validate required fields
        if (
            !name ||
            !desc ||
            !city ||
            !area ||
            !rateRange ||
            !availableDays ||
            !phone ||
            !catId ||
            !subCatId ||
            !userId
        ) {
            throw new BadRequestError("fill in required fields!");
        }

        //create service

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
        const laborServices = await prisma.laborService.findMany({
            include: {
                service: true,
            },
        });

        res.status(httpStatusCodes.OK).json(laborServices);
    } catch (error) {
        next(error);
    }
};

export const getLaborServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const laborService = await prisma.laborService.findUnique({
            where: {
                id,
            },
            include: {
                service: true,
            },
        });

        if (!laborService) {
            throw new NotFoundError(`No service with id ${id}`);
        }

        res.status(httpStatusCodes.OK).json(laborService);
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

        let { rate } = req.body;
        rate = parseInt(rate);

        // Validate required fields
        if (
            !name ||
            !desc ||
            !city ||
            !area ||
            !rateRange ||
            !availableDays ||
            !phone ||
            !catId ||
            !subCatId ||
            !userId
        ) {
            throw new BadRequestError("fill in required fields!");
        }

        // Check if laborService exist
        const laborService = await prisma.laborService.findUnique({
            where: { id },
        });
        if (!laborService) {
            throw new NotFoundError("laborService does not exist!");
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

        // update service
        const service = await prisma.service.update({
            where: { id: laborService.serviceId },
            data: {
                name,
                desc,
                catId,
                subCatId,
                userId,
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
                serviceId: service.id,
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

        // Check if laborService and service exist
        const laborService = await prisma.laborService.findUnique({
            where: { id },
        });
        const service = await prisma.service.findUnique({
            where: { id: laborService.serviceId },
        });
        if (!service || !laborService) {
            throw new NotFoundError("laborService does not exist!");
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

