import express from "express";
import {
    createStoreService,
    getAllStoreServices,
    getStoreServiceById,
    updateStoreService,
    deleteStoreService,
} from "../../controllers/storeService.controller.js";
import upload from "../../middlewares/uploadImage.js";

import { isAuthenticated } from "../../middlewares/auth.js";

const router = express.Router();

router
    .route("/storeService")
    .post(isAuthenticated, upload.single("image"), createStoreService);

router.route("/storeService").get(getAllStoreServices);

router.route("/storeService/:id").get(getStoreServiceById);

router.route("/storeService/:id").put(isAuthenticated, updateStoreService);

router.route("/storeService/:id").delete(isAuthenticated, deleteStoreService);

export default router;

