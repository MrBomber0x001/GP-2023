import prisma from "../../config/prisma.js";
import { BadRequestError, httpStatusCodes } from "../../error/index.js";

/**
 * @Author Shefo
 * @desc Create Sub-Category
 * @access public
 * @method POST
 * @endpoint `base/admin/subCategory`
 * @returns {object} status, data
 */
export const CreateSubCat = async (req, res, next) => {
    try {
        const { name, catId } = req.body;

        // Check required fields
        if (!name || !catId) {
            throw new BadRequestError("Please fill in required fields!");
        }

        // Check empty fileds
        if (name.trim() === "") {
            throw new BadRequestError("Name can't be empty!");
        }

        // Checking for existing subCategory
        const SubCat = await prisma.sub_Category.findFirst({
            where: { name: name },
        });
        if (SubCat) {
            throw new BadRequestError("subCategory name already exist!");
        }

        // Check if category exist
        const cat = await prisma.category.findUnique({
            where: { id: catId },
        });
        if (!cat) {
            throw new BadRequestError("Category does not exist!");
        }

        // Create Category
        const newSubCat = await prisma.sub_Category.create({
            data: {
                name: name,
                catId: catId,
            },
        });

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: newSubCat,
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
 * @endpoint `base/admin/subCategory`
 * @returns {object} status, data
 */
export const getAllSubCat = async (req, res, next) => {
    try {
        const AllSubCategorys = await prisma.sub_Category.findMany({});

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
 * @desc Get all Sub-Category based on a category
 * @access public
 * @method GET
 * @endpoint `base/admin/subCategory`
 * @returns {object} status, data
 */
export const getAllSubCatForCat = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check required fields
        if (!id) {
            throw new BadRequestError("Category Id is Required!");
        }

        // Check if category exist
        const cat = await prisma.category.findUnique({
            where: { id: id },
        });
        if (!cat) {
            throw new BadRequestError("Category does not exist!");
        }

        // Get all subCategorys
        const AllSubCategorys = await prisma.sub_Category.findMany({
            where: { catId: id },
        });

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: AllSubCategorys,
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
 * @endpoint `base/admin/subCategory/:id`
 * @returns {object} status, data || status
 */
export const updateSubCat = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Check required fields
        if (!id) {
            throw new BadRequestError("subCategory Id is Required!");
        }

        // Name Can't be empty
        if (name.trim() === "") {
            throw new BadRequestError("Name can't be empty!");
        }

        // Checking for existing subCategory
        const SubCat = await prisma.sub_Category.findFirst({
            where: { name: name },
        });
        if (SubCat) {
            throw new BadRequestError("subCategory name already exist!");
        }

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

        // Check required fields
        if (!id) {
            throw new BadRequestError("subCategory Id is Required!");
        }

        // Check if subCategory exist
        const subCategory = await prisma.sub_Category.findUnique({
            where: { id: id },
        });
        if (!subCategory) {
            throw new BadRequestError(
                `subCategory with id:${id} does not exist!`
            );
        }

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

/**
 * @Author Shefo
 * @desc Delete all Sub-Category based on category
 * @access public
 * @method PUT
 * @endpoint DELETE `base/admin/subCategory/cat/:id`
 * @returns {object} status
 */
export const deleteAllSubCat = async (req, res, next) => {
    try {
        const { catId } = req.params;

        // Check required fields
        if (!catId) {
            throw new BadRequestError("Category Id is Required!");
        }

        // Check if subCategory exist
        const Category = await prisma.category.findUnique({
            where: { id: catId },
        });
        if (!Category) {
            throw new BadRequestError(
                `Category with id:${catId} does not exist!`
            );
        }

        // Get and delete subCategoet
        const deleteSubCategorys = await prisma.sub_Category.deleteMany({
            where: { catId: catId },
        });

        res.status(httpStatusCodes.OK).json({
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

