import prisma from "../../config/prisma.js";
import {
    BadRequestError,
    httpStatusCodes,
    NotFoundError,
} from "../../error/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
/**
 * @Author Shefo
 * @desc Create Sub-Category
 * @access private
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

        // get image path if exists
        const imagePath = req.file ? req.file.path : null;

        // get relative path if image path not null
        const imageRelativePath = imagePath
            ? path.relative(path.join(dirname, "../.."), imagePath)
            : null;

        console.log(imageRelativePath);

        // Create Category
        const newSubCat = await prisma.sub_Category.create({
            data: {
                name: name,
                catId: catId,
                image: imageRelativePath,
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

/**
 * @Author Shefo
 * @desc get Sub-Category by name
 * @access public
 * @method GET
 * @endpoint `base/admin/subCategory/:name`
 * @returns {object} status, data
 */

export const getSubCatByName = async (req, res, next) => {
    try {
        const { name } = req.params;

        // Check required fields
        if (!name) {
            throw new BadRequestError("Name is Required!");
        }

        // Get subCategory
        const subCategory = await prisma.sub_Category.findFirst({
            where: { name: name },
        });

        // Check if subCategory not found
        if (!subCategory) {
            throw new NotFoundError("subCategory not found!");
        }

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: subCategory,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Shefo
 * @desc Update Sub-Category
 * @access private
 * @method PUT
 * @endpoint `base/admin/subCategory/:id`
 * @returns {object} status, data || status
 */
export const updateSubCat = async (req, res, next) => {
    try {
        // check required fields
        if (!req.params.id) {
            throw new BadRequestError("subCategory Id is Required!");
        }

        // check if subCategory exist
        const subCategory = await prisma.sub_Category.findUnique({
            where: { id: req.params.id },
        });

        if (!subCategory) {
            throw new NotFoundError(
                `subCategory with id:${req.params.id} does not exist!`
            );
        }

        const updateObj = {};

        // check if name is provided
        if (req.body.name) {
            // check if name is empty
            if (req.body.name.trim() === "") {
                throw new BadRequestError("Name can't be empty!");
            }

            // check if name already exist
            const subCategory = await prisma.sub_Category.findFirst({
                where: { name: req.body.name },
            });

            if (subCategory) {
                throw new BadRequestError("subCategory name already exist!");
            }

            updateObj.name = req.body.name;
        }

        // check if image is provided
        if (req.file) {
            // get image path
            const imagePath = req.file.path;

            // get relative path
            const imageRelativePath = path.relative(
                path.join(dirname, "../.."),
                imagePath
            );

            updateObj.image = imageRelativePath;
        }

        // get old image path
        const oldImagePath = subCategory.image;

        // update subCategory
        const updatedSubCat = await prisma.sub_Category.update({
            where: { id: req.params.id },
            data: updateObj,
        });

        // delete old image if exists and new image is provided
        if (
            fs.existsSync(path.join(dirname, "../..", oldImagePath)) &&
            req.file
        ) {
            fs.unlinkSync(path.join(dirname, "../..", oldImagePath), (err) => {
                if (err) {
                    throw new InternalServerError("Error deleting old image!");
                }
            });
        }

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: updatedSubCat,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Shefo
 * @desc Delete Sub-Category
 * @access private
 * @method DELETE
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
            throw new NotFoundError(
                `subCategory with id:${id} does not exist!`
            );
        }

        // get image path
        const imagePath = subCategory.image;

        // delete image from public folder if exists

        if (
            imagePath &&
            fs.existsSync(path.join(dirname, "../..", imagePath))
        ) {
            fs.unlink(path.join(dirname, "../..", imagePath), (err) => {
                if (err) {
                    throw new InternalServerError("Error deleting image!");
                }
            });
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
 * @access private
 * @method DELETE
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

        const subCategories = await prisma.sub_Category.findMany({
            where: { catId: catId },
        });

        console.log(subCategories);

        // delete image from public folder if exists
        subCategories.forEach((subCategory) => {
            const imagePath = subCategory.image;

            if (
                imagePath &&
                fs.existsSync(path.join(dirname, "../..", imagePath))
            ) {
                fs.unlink(path.join(dirname, "../..", imagePath), (err) => {
                    if (err) {
                        throw new InternalServerError("Error deleting image!");
                    }
                });
            }
        });

        // Get and delete subCategoet
        const deleteSubCategories = await prisma.sub_Category.deleteMany({
            where: { catId: catId },
        });

        res.status(httpStatusCodes.OK).json({
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};
