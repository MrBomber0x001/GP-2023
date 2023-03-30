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

import { isAdmin, isAuthenticated } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/categories").get(getAllCategories);
router.route("/categories/:id").get(getCategoryById);
router.route("/categories/name/:name").get(getCategoryByName);
router
    .route("/categories")
    .post(/*isAuthenticated,isAdmin,*/ upload.single("image"), createCategory);
router
    .route("/categories/:id")
    .put(/*isAuthenticated,isAdmin,*/ upload.single("image"), updateCategory);
router
    .route("/categories/:id")
    .delete(/*isAuthenticated,isAdmin,*/ deleteCategory);

export default router;
