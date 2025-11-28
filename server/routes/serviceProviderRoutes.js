import express from "express";
import ServiceProvider from "../models/ServiceProvider.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Create service provider
router.post("/", async (req, res) => {
  try {
    const providerId = uuidv4();

    const provider = await ServiceProvider.create({
      ...req.body,
      providerId,
    });

    res.json({ success: true, provider });
  } catch (err) {
    console.error("Provider Create Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Get all providers
router.get("/", async (req, res) => {
  try {
    const providers = await ServiceProvider.find().sort({ createdAt: -1 });
    res.json({ success: true, providers });
  } catch (err) {
    console.error("Fetch Provider Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
