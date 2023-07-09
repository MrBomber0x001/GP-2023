import express from "express";

import {
    createPropertyService,
    getAllPropertyServices,
    getPropertyServiceById,
    updatePropertyService,
    deletePropertyService,
    getPropertyServicesByUserId,
} from "../../controllers/propertyService.controller.js";

import { isAuthenticated } from "../../middlewares/auth.js";
import upload from "../../middlewares/uploadImage.js";

const router = express.Router();

router
    .route("/ProperyService")
    .post(isAuthenticated, upload.single("image"), createPropertyService);

router.route("/ProperyService").get(getAllPropertyServices);

router.route("/ProperyService/:id").get(getPropertyServiceById);

router.route("/ProperyService/user/:id").get(isAuthenticated,getPropertyServicesByUserId);

router.route("/ProperyService/:id").put(isAuthenticated, updatePropertyService);

router
    .route("/ProperyService/:id")
    .delete(isAuthenticated, deletePropertyService);

export default router;
