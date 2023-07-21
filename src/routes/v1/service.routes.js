import express from "express";

import {
    getServicesBySubCatId,
    getAllServicesInAllCategory,
} from "../../controllers/service.controller.js";

const router = express.Router();

router.route("/allServices").get(getAllServicesInAllCategory);

router.route("/:subCatId").get(getServicesBySubCatId);

export default router;

