import express from "express";


import {
  createCase,
  getCaseByNumber,
  getAllCases,
  deleteCase,
  getCaseById,
  updateCase,
} from "../controllers/caseController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCase);

router.get("/:caseNumber", getCaseByNumber);

router.get("/", protect, getAllCases);

router.delete("/:id", protect, deleteCase);

router.put("/:id", protect, updateCase);

router.get("/id/:id", protect, getCaseById);

router.delete("/:id", protect, deleteCase);

export default router;