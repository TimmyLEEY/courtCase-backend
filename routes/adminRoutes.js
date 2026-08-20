import express from "express";
import {
  createAdmin,
  loginAdmin,
} from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Admin authenticated successfully",
    admin: req.admin,
  });
});

export default router;