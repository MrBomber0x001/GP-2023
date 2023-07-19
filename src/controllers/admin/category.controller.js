import prisma from "../../config/prisma.js";
import {
    BadRequestError,
    NotFoundError,
    httpStatusCodes,
    InternalServerError,
} from "../../error/index.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
        const subCategories = (await prisma.sub_Category.findMany()) ?? [];
        const categoriesWithSubCategories = categories.map((category) => ({
            ...category,
            subCategories: subCategories
                .filter((subCategory) => subCategory.catId === category.id)
                .map((subCategory) => {
                    return {
                        id: subCategory.id,
                        name: subCategory.name,
                    };
                }),
        }));
        console.log(categoriesWithSubCategories);
        res.status(httpStatusCodes.OK).json({
            categories: categoriesWithSubCategories,
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

        // Get all Categorys
        const AllCategorys = await prisma.category.findMany({});

        // join subCategorys with categorys
        const subCategorysWithCategorys = AllSubCategorys.map((subCategory) => {
            const category = AllCategorys.find(
                (category) => category.id === subCategory.catId
            );
            return {
                ...subCategory,
                category: category,
            };
        });

        res.status(httpStatusCodes.OK).json({
            subCategorysWithCategorys,
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
            category,
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

        console.log(category);

        // check if category not found
        if (!category) {
            throw new NotFoundError("Category not found!");
        }

        res.status(httpStatusCodes.OK).json({
            category,
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
        console.log(req.body);

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
        const imagePath = req.file ? req.file.path : null;

        // get relative path if image path not null
        const imageRelativePath = imagePath
            ? path.relative(path.join(dirname, "../.."), imagePath)
            : null;

        console.log(imageRelativePath);

        const category = await prisma.category.create({
            data: {
                name: req.body.name,
                image: `/${imageRelativePath}`,
            },
        });

        res.status(httpStatusCodes.CREATED).json({
            category,
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

            updateObj.name = req.body.name;
        }

        // check if image is exists
        if (req.file) {
            // get image path
            const newImagePath = req.file.path;

            // get relative path
            const imageRelativePath = path.relative(
                path.join(dirname, "../.."),
                newImagePath
            );

            updateObj.image = `/${imageRelativePath}`;
        }

        // get old image path
        const oldImagePath = categoryExists.image;

        // update category
        const updatedCategory = await prisma.category.update({
            where: { id: req.params.id },
            data: updateObj,
        });

        // delete old image if exists and new image is uploaded
        if (
            fs.existsSync(path.join(dirname, "../..", oldImagePath)) &&
            req.file
        ) {
            fs.unlink(path.join(dirname, "../..", oldImagePath), (err) => {
                if (err) {
                    throw new InternalServerError("Error deleting old image!");
                }
            });
        }

        res.status(httpStatusCodes.NO_CONTENT).json();
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

        // delete image from public folder if exists

        if (
            imagePath &&
            fs.existsSync(path.join(dirname, "../..", imagePath))
        ) {
            fs.unlink(path.join(dirname, "../..", imagePath), (err) => {
                if (err) {
                    throw new InternalServerError("Something went wrong!");
                }

                console.log("image deleted successfully");
            });
        }

        // delete images for subcategories
        const subcategories = await prisma.sub_Category.findMany({
            where: { catId: req.params.id },
        });

        subcategories.forEach((subcategory) => {
            if (
                subcategory.image &&
                fs.existsSync(path.join(dirname, "../..", subcategory.image))
            ) {
                fs.unlink(
                    path.join(dirname, "../..", subcategory.image),
                    (err) => {
                        if (err) {
                            throw new InternalServerError(
                                "Something went wrong!"
                            );
                        }
                    }
                );
            }
        });

        const deletedCategory = await prisma.category.delete({
            where: { id: req.params.id },
        });

        res.status(httpStatusCodes.NO_CONTENT).json();
    } catch (error) {
        next(error);
    }
};

