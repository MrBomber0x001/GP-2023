const express = require("express");
const router = express.Router();

const { login } = require("../../controllers/v1/auth.controller");

router.route("/signup").post();

router.route("/login").post(login);

export default router;
