import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.REPORT_MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/report", reportRoutes);

app.listen(PORT, () => console.log("Server running on port 5000"));
