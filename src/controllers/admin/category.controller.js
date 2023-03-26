import prisma from "../../config/prisma.js";
import {
    BadRequestError,
    NotFoundError,
    httpStatusCodes,
    InternalServerError,
} from "../../error/index.js";

import fs from "fs";

/**
 * @Author Eslam
 * @desc get all categories
 * @access public
 * @param {object} req, res , next
 * @returns {object} {status, data}
 */

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Eslam
 * @desc get category by id
 * @access public
 * @param {object} req, res , next
 * @returns {object} {status, data}
 */

// get category by id
export const getCategoryById = async (req, res, next) => {
    try {
        // validate id
        if (!req.params.id) {
            throw new BadRequestError("Category id is required!");
        }

        const category = await prisma.category.findUnique({
            where: { id: req.params.id },
        });

        // check if category not found
        if (!category) {
            throw new NotFoundError("Category not found!");
        }

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: category,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Eslam
 * @desc get category by name
 * @access public
 * @param {object} req, res , next
 * @returns {object} {status, data}
 */

// get category by name
export const getCategoryByName = async (req, res, next) => {
    try {
        // check name
        if (!req.params.name) {
            throw new BadRequestError("Category name is required!");
        }

        const category = await prisma.category.findFirst({
            where: { name: req.params.name },
        });

        // check if category not found
        if (!category) {
            throw new NotFoundError("Category not found!");
        }

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: category,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Eslam
 * @desc create category
 * @access private
 * @param {object} req, res , next
 * @returns {object} {status, data}
 */

// create category
export const createCategory = async (req, res, next) => {
    try {
        console.log(req.file);

        // validate name
        if (!req.body.name) {
            throw new BadRequestError("Please fill in the required fields!");
        }

        // check if name is empty
        if (req.body.name.trim() === "") {
            throw new BadRequestError("Name can't be empty!");
        }

        // check if category already exists
        const categoryExists = await prisma.category.findFirst({
            where: { name: req.body.name },
        });
        if (categoryExists) {
            throw new BadRequestError("Category already exists!");
        }

        // get image path if exists
        const imagepath = req.file ? req.file.path : null;

        const category = await prisma.category.create({
            data: {
                name: req.body.name,
                image: imagepath,
            },
        });

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: category,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Eslam
 * @desc update category
 * @access private
 * @param {object} req, res , next
 * @returns {object} {status, data}
 */

// update category
export const updateCategory = async (req, res, next) => {
    try {
        // Check required fields
        if (!req.params.id) {
            throw new BadRequestError(`Category id is required!`);
        }

        // check if category exists
        const categoryExists = await prisma.category.findUnique({
            where: { id: req.params.id },
        });

        if (!categoryExists) {
            throw new NotFoundError("Category not found!");
        }

        const updateObj = {};

        // check if name is exists
        if (req.body.name) {
            // check if name is empty
            if (req.body.name.trim() === "") {
                throw new BadRequestError("Name can't be empty!");
            }

            // check if category name already exists
            const categoryExists = await prisma.category.findFirst({
                where: { name: req.body.name },
            });
            if (categoryExists) {
                throw new BadRequestError("Category name already exists!");
            }

            updateObj.name = req.body.name;
        }

        // check if image is exists
        if (req.file) {
            // get image path
            const newImagePath = req.file.path;
            updateObj.image = newImagePath;
        }

        // get old image path
        const oldImagePath = categoryExists.image;

        // update category
        const updatedCategory = await prisma.category.update({
            where: { id: req.params.id },
            data: updateObj,
        });

        // delete old image if exists and if new image exists
        if (oldImagePath && req.file) {
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    throw new InternalServerError("Error deleting old image!");
                }
            });
        }

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: updatedCategory,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @Author Eslam
 * @desc delete category
 * @access private
 * @param {object} req, res , next
 * @returns {object} {status, data}
 */

// delete category
export const deleteCategory = async (req, res, next) => {
    try {
        // validate id
        if (!req.params.id) {
            throw new BadRequestError("Category id is required!");
        }

        // check if category not found
        const category = await prisma.category.findUnique({
            where: { id: req.params.id },
        });
        if (!category) {
            throw new NotFoundError(
                `Category with id ${req.params.id} not found!`
            );
        }

        // get image path
        const imagePath = category.image;

        console.log(imagePath);

        // delete image from public folder if exists

        if (imagePath) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    throw new InternalServerError("Something went wrong!");
                }

                console.log("image deleted successfully");
            });
        }

        const deletedCategory = await prisma.category.delete({
            where: { id: req.params.id },
        });

        res.status(httpStatusCodes.OK).json({
            status: "success",
            data: deletedCategory,
        });
    } catch (error) {
        next(error);
    }
};
