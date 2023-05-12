import express from "express";

import {
    createPropertyService,
    getAllPropertyServices,
    getPropertyServiceById,
    updatePropertyService,
    deletePropertyService,
} from "../../controllers/propertyService.controller.js";

import { isAuthenticated } from "../../middlewares/auth.js";

const router = express.Router();

router.route("/ProperyService").post(isAuthenticated, createPropertyService);

router.route("/ProperyService").get(getAllPropertyServices);

router.route("/ProperyService/:id").get(getPropertyServiceById);

router.route("/ProperyService/:id").put(isAuthenticated, updatePropertyService);

router
    .route("/ProperyService/:id")
    .delete(isAuthenticated, deletePropertyService);

export default router;
