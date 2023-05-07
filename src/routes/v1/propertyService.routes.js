import express from "express";
import {
    createContractorService,
    getAllContractorServices,
    getContractorServiceById,
    updateContractorService,
    deleteContractorService,
} from "../../controllers/contractorService.controller.js";

import { isAuthenticated } from "../../middlewares/auth.js";

const router = express.Router();

router
    .route("/contractorService")
    .post(isAuthenticated, createContractorService);

router.route("/contractorService").get(getAllContractorServices);

router.route("/contractorService/:id").get(getContractorServiceById);

router
    .route("/contractorService/:id")
    .put(isAuthenticated, updateContractorService);

router
    .route("/contractorService/:id")
    .delete(isAuthenticated, deleteContractorService);

export default router;
