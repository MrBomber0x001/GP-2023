import express from "express";
import {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../../controllers/admin/category.controller.js";
import upload from "../../../middlewares/uploadImage.js";

const router = express.Router();

router.route("/categories").get(getAllCategories);
router.route("/categories/:id").get(getCategoryById);
router.route("/categories/name/:name").get(getCategoryByName);
router.route("/categories").post(upload.single("image"), createCategory);
router.route("/categories/:id").put(upload.single("image"), updateCategory);
router.route("/categories/:id").delete(deleteCategory);

export default router;
