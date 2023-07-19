import express from "express";

import { getServicesBySubCatId } from "../../controllers/service.controller.js";

const router = express.Router();

router.route("/:subCatId").get(getServicesBySubCatId);

export default router;
