import express from "express";
const router = express.Router();

import { login, signup } from "../../controllers/auth.controller";

router.route("/signup").post(signup);

router.route("/login").post(login);

export default router;

