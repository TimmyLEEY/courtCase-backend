import express from "express";


import {
  createCase,
  getCaseByNumber,
  getAllCases,
  deleteCase,
} from "../controllers/caseController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCase);

router.get("/:caseNumber", getCaseByNumber);

router.get("/", protect, getAllCases);

router.delete("/:id", protect, deleteCase);

export default router;