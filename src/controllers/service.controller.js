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

export const getAllServicesInAllCategory = async (req, res, next) => {
    try {
        const stores = await prisma.storeService.findMany({
            include: {
                service: true,
            },
        });

        const labors = await prisma.laborService.findMany({
            include: {
                service: true,
            },
        });

        const properties = await prisma.propertyService.findMany({
            include: {
                service: true,
            },
        });

        const contractors = await prisma.contractorService.findMany({
            include: {
                service: true,
            },
        });

        const categories = await prisma.category.findMany();

        const subCategories = await prisma.sub_Category.findMany();

        const users = await prisma.user.findMany();

        // now for every service , add object for each one of this (category, sub category, user)
        stores.forEach((store) => {
            store["category"] = categories.find(
                (category) => category.id === store.service.catId
            );
            store["subCategory"] = subCategories.find(
                (subCategory) => subCategory.id === store.service.subCatId
            );
            store["user"] = users.find(
                (user) => user.id === store.service.userId
            );
        });

        labors.forEach((labor) => {
            labor["category"] = categories.find(
                (category) => category.id === labor.service.catId
            );
            labor["subCategory"] = subCategories.find(
                (subCategory) => subCategory.id === labor.service.subCatId
            );
            labor["user"] = users.find(
                (user) => user.id === labor.service.userId
            );
        });

        properties.forEach((property) => {
            property["category"] = categories.find(
                (category) => category.id === property.service.catId
            );
            property["subCategory"] = subCategories.find(
                (subCategory) => subCategory.id === property.service.subCatId
            );
            property["user"] = users.find(
                (user) => user.id === property.service.userId
            );
        });

        contractors.forEach((contractor) => {
            contractor["category"] = categories.find(
                (category) => category.id === contractor.service.catId
            );
            contractor["subCategory"] = subCategories.find(
                (subCategory) => subCategory.id === contractor.service.subCatId
            );
            contractor["user"] = users.find(
                (user) => user.id === contractor.service.userId
            );
        });

        //now join all the services in random order
        const services = [...stores, ...labors, ...properties, ...contractors];

        res.status(httpStatusCodes.OK).json({
            services,
        });
    } catch (error) {
        next(error);
    }
};

