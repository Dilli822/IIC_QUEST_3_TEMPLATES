import express from "express";

import upload from "../utils/multer.js";
import { getReports, submitReport } from "../controllers/report.controller.js";

const router = express.Router();

router.post("/create", upload.single("image"), submitReport);
router.get("/all", getReports);
export default router;
