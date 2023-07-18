import express from "express";
import {
    getUserById,
    updateUserById,
} from "../../controllers/user.controller.js";

import upload from "../../middlewares/uploadImage.js";

import { isAuthenticated } from "../../middlewares/auth.js";

const router = express.Router();

router.route("/:id").get(isAuthenticated, getUserById);

router
    .route("/:id")
    .put(isAuthenticated, upload.single("image"), updateUserById);

export default router;
