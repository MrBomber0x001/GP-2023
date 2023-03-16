import express from "express";

import {
    CreateSubCat,
    getAllSubCat,
    getAllSubCatForCat,
    getSubCatByName,
    updateSubCat,
    deleteSubCat,
    deleteAllSubCat,
} from "../../../controllers/admin/sub-category.controller.js";

const router = express.Router();

router.route("/subCategory").post(CreateSubCat).get(getAllSubCat);
router.route("/subCategory/cat/:catId").delete(deleteAllSubCat);
router
    .route("/subCategory/:id")
    .put(updateSubCat)
    .delete(deleteSubCat)
    .get(getAllSubCatForCat);

export default router;

