import express from "express";

import {
    CreateSubCat,
    getAllSubCat,
    getSubCatByName,
    updateSubCat,
    deleteSubCat,
    deleteAllSubCat,
} from "../../../controllers/admin/sub-category.controller.js";

import upload from "../../../middlewares/uploadImage.js";

import { isAdmin, isAuthenticated } from "../../../middlewares/auth.js";

const router = express.Router();

router
    .route("/subCategory")
    .post(isAuthenticated, isAdmin, upload.single("image"), CreateSubCat)
    .get(getAllSubCat);
router.route("/subCategory/name/:name").get(getSubCatByName);
router
    .route("/subCategory/cat/:catId")
    .delete(isAuthenticated, isAdmin, deleteAllSubCat);
router
    .route("/subCategory/:id")
    .put(isAuthenticated, isAdmin, upload.single("image"), updateSubCat)
    .delete(isAuthenticated, isAdmin, deleteSubCat);

export default router;

