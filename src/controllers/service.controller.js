import prisma from "../config/prisma.js";
import { BadRequestError, httpStatusCodes } from "../error/index.js";

export const getServicesBySubCatId = async (req, res, next) => {
    try {
        const { subCatId } = req.params;

        if (!subCatId) {
            throw new BadRequestError("Sub Category Id is required");
        }

        // get all services by sub category id and join with the respective tables

        const services = await prisma.service.findMany({
            where: {
                subCatId: subCatId,
            },
            include: {
                LaborServices: true,
                StoreServices: true,
                PropertyServices: true,
                ContractorServices: true,
            },
        });

        // get the sub category
        const subCategory = await prisma.sub_Category.findFirst({
            where: {
                id: subCatId,
            },
        });

        res.status(httpStatusCodes.OK).json({
            subCategory,
            services,
        });
    } catch (error) {
        next(error);
    }
};
