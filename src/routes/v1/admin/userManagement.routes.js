import express from "express";

import {
    getAllUsers,
    getUserById,
    deleteUserById,
} from "../../../controllers/admin/userManagement.controller.js";

import { isAdmin, isAuthenticated } from "../../../middlewares/auth.js";
const router = express.Router();

router.route("/users").get(isAuthenticated, isAdmin, getAllUsers);

router.route("/users/:id").get(isAuthenticated, isAdmin, getUserById);

router.route("/users/:id").delete(isAuthenticated, isAdmin, deleteUserById);

export default router;

