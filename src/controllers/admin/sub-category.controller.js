import prisma from "../../config/prisma.js";
import { BadRequestError, httpStatusCodes } from "../../error/index.js";

/**
 * @Author Shefo
 * @desc Create Sub-Category
 * @access public
 * @method POST
 * @endpoint POST `base/admin/subCategory`
 * @returns {object} status, message
 */
export const CreateSubCat = async (req, res, next) => {
    try {
        const { name, catId } = req.body;

        // Check required fields
        if (!name || !catId) {
            throw new BadRequestError("Please fill in all fields!");
        }

        const newSubCat = await prisma.sub_Category.create({
            data: {
                name: name,
                catId: catId,
            },
        });

        res.status(httpStatusCodes.OK).json({
            status: "success",
            message: "category created",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Shefo
 * @desc Get all Sub-Category
 * @access public
 * @method GET
 * @endpoint GET `base/admin/subCategory`
 * @returns {object} status, data
 */
export const getAllSubCat = async (req, res, next) => {
    try {
        const AllSubCategorys = await prisma.sub_Category.findMany();
        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: AllSubCategorys,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Shefo
 * @desc Get all Sub-Category
 * @access public
 * @method GET
 * @endpoint GET `base/admin/subCategory/:id`
 * @returns {object} status, data
 */
export const getSubCatById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // check for existing category
        const subCategory = await prisma.sub_Category.findUnique({
            where: { id: id },
        });

        if (!subCategory) {
            throw new BadRequestError(`No SubCategory with id ${id}!`);
        }

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: subCategory,
        });
    } catch (error) {
        next(error);
    }
};

export const getSubCatByName = async (req, res, next) => {};

/**
 * @Author Shefo
 * @desc Update Sub-Category
 * @access public
 * @method PUT
 * @endpoint PUT `base/admin/subCategory/:id`
 * @returns {object} status, data
 */
export const updateSubCat = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Get and update subCategoet
        const updateSubCategory = await prisma.sub_Category.update({
            where: { id: id },
            data: {
                name: name,
            },
        });

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: updateSubCategory,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Shefo
 * @desc Delete Sub-Category
 * @access public
 * @method PUT
 * @endpoint DELETE `base/admin/subCategory/:id`
 * @returns {object} status
 */
export const deleteSubCat = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Get and delete subCategoet
        const deleteSubCategory = await prisma.sub_Category.delete({
            where: { id: id },
        });

        res.status(httpStatusCodes.OK).json({
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

