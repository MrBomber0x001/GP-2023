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

        services.forEach((service) => {
            if (service.LaborServices.length > 0) {
                service["service"] = service.LaborServices[0];
                delete service.LaborServices;
                delete service.StoreServices;
                delete service.PropertyServices;
                delete service.ContractorServices;
            } else if (service.StoreServices.length > 0) {
                service["service"] = service.StoreServices[0];
                delete service.LaborServices;
                delete service.StoreServices;
                delete service.PropertyServices;
                delete service.ContractorServices;
            } else if (service.PropertyServices.length > 0) {
                service["service"] = service.PropertyServices[0];
                delete service.LaborServices;
                delete service.StoreServices;
                delete service.PropertyServices;
                delete service.ContractorServices;
            } else if (service.ContractorServices.length > 0) {
                service["service"] = service.ContractorServices[0];
                delete service.LaborServices;
                delete service.StoreServices;
                delete service.PropertyServices;
                delete service.ContractorServices;
            }
        });

        // get the sub category
        const subCategory = await prisma.sub_Category.findFirst({
            where: {
                id: subCatId,
            },
        });

        res.status(httpStatusCodes.OK).json({
            id: subCategory.id,
            name: subCategory.name,
            image: subCategory.image,
            catId: subCategory.catId,
            services,
        });
    } catch (error) {
        next(error);
    }
};
