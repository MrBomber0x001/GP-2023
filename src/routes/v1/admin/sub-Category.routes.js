import express from "express";

import {
    CreateSubCat,
    getAllSubCat,
    getSubCatById,
    getSubCatByName,
    updateSubCat,
    deleteSubCat,
} from "../../../controllers/admin/sub-category.controller.js";

const router = express.Router();

router.route("/subCategory").post(CreateSubCat).get(getAllSubCat);
router
    .route("/subCategory/:id")
    .get(getSubCatById)
    .put(updateSubCat)
    .delete(deleteSubCat);

export default router;

