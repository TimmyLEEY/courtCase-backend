import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://courtclerk.netlify.app",
      "https://courtcleark.org",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/cases", caseRoutes);
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/cases", caseRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Court Case API is running",
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });