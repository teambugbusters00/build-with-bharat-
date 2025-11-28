import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import reportRoutes from "./routes/reportRoutes.js";
import serviceProviderRoutes from "./routes/serviceProviderRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// Database Connection
mongoose
  .connect(process.env.REPORT_MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/report", reportRoutes);
app.use("/api/providers", serviceProviderRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/events", eventRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("GaonConnect Backend Running");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
