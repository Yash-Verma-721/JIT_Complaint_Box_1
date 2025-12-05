// import { startServer } from './server';

// startServer();

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import adminComplaintRoutes from "./routes/adminComplaintRoutes";
import { seedDefaultAdmin } from "./config/seedAdmin";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminComplaintRoutes);

// TODO: your student complaint submit route should be here too
// e.g. app.use("/api/complaints", complaintRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/jit_complaint_box";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await seedDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });

export default app;
