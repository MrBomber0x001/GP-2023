import express from "express";
import {
    createStore,
    getAllStoreServices,
} from "../../controllers/storeService.controller.js";
import upload from "../../middlewares/uploadImage.js";

import { isAuthenticated } from "../../middlewares/auth.js";

const router = express.Router();

router
    .route("/storeService")
    .post(isAuthenticated, upload.single("image"), createStore);

router.route("/storeService").get(getAllStoreServices);

export default router;

