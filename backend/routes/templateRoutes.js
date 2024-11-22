import express from "express";
import {
  parseTemplate,
  previewTemplate,
  validateTemplate,
} from "../controllers/templateController.js";

const router = express.Router();

router.post("/parse", parseTemplate);
router.get("/validate", validateTemplate);
router.post("/preview", previewTemplate);

export default router;
