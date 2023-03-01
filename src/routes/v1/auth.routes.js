const express = require("express");
const router = express.Router();

const { login, signup } = require("../../controllers/v1/auth.controller");

router.route("/signup").post(signup);

router.route("/login").post(login);

export default router;

