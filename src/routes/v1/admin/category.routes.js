import express from "express";
import {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../../controllers/admin/category.controller.js";

const router = express.Router();

router.route("/categories").get(getAllCategories);
router.route("/categories/:id").get(getCategoryById);
router.route("/categories/name/:name").get(getCategoryByName);
router.route("/categories").post(createCategory);
router.route("/categories/:id").put(updateCategory);
router.route("/categories/:id").delete(deleteCategory);

export default router;
