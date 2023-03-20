import prisma from "../../config/prisma.js";
import {
    BadRequestError,
    NotFoundError,
    httpStatusCodes,
} from "../../error/index.js";

/**
 * @Author Eslam
 * @desc get all categories
 * @access public
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 * @returns {object} error
 * @returns {object} next middleware
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
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 * @returns {object} error
 * @returns {object} next middleware
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
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 * @returns {object} error
 * @returns {object} next middleware
 */

// get category by name
export const getCategoryByName = async (req, res, next) => {
    try {
        // validate name
        if (!req.params.name) {
            throw new BadRequestError("Invalid name!");
        }

        const category = await prisma.category.findUnique({
            where: { name: req.params.name },
        });

        // check if category not found
        if (!category) {
            throw new NotFoundError("Category not found!");
        }

        res.status(200).json({
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
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 * @returns {object} error
 * @returns {object} next middleware
 */

// create category
export const createCategory = async (req, res, next) => {
    try {
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

        const category = await prisma.category.create({
            data: {
                name: req.body.name,
            },
        });

        res.status(201).json({
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
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 * @returns {object} error
 * @returns {object} next middleware
 */

// update category
export const updateCategory = async (req, res, next) => {
    try {
        // Check required fields
        if (!req.params.id || !req.body.name) {
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

        // check if category not found
        const category = await prisma.category.findUnique({
            where: { id: req.params.id },
        });
        if (!category) {
            throw new NotFoundError("Category not found!");
        }

        const updatedCategory = await prisma.category.update({
            where: { id: req.params.id },
            data: {
                name: req.body.name,
            },
        });

        res.status(200).json({
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
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 * @returns {object} error
 * @returns {object} next middleware
 */

// delete category
export const deleteCategory = async (req, res, next) => {
    try {
        // validate id
        if (!req.params.id) {
            throw new BadRequestError("Please fill in the required fields!");
        }

        // check if category not found
        const category = await prisma.category.findUnique({
            where: { id: req.params.id },
        });
        if (!category) {
            throw new NotFoundError("Category not found!");
        }

        const deletedCategory = await prisma.category.delete({
            where: { id: req.params.id },
        });

        res.status(200).json({
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

