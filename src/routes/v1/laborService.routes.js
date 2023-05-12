import express from "express";
import {
    createLaborService,
    getAllLaborServices,
    getLaborServiceById,
    updateLaborService,
    deleteLaborService,
} from "../../controllers/laborService.controller.js";

import { isAuthenticated } from "../../middlewares/auth.js";

const router = express.Router();

router.route("/laborService").post(isAuthenticated, createLaborService);

router.route("/laborService").get(getAllLaborServices);

router.route("/laborService/:id").get(getLaborServiceById);

router.route("/laborService/:id").put(isAuthenticated, updateLaborService);

router.route("/laborService/:id").delete(isAuthenticated, deleteLaborService);

export default router;

