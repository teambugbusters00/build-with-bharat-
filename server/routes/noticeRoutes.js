import express from "express";
import Notice from "../models/Notice.js";

const router = express.Router();

/* ------------------ CREATE NEW NOTICE ------------------ */
router.post("/", async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.json({ success: true, notice });
  } catch (err) {
    console.error("Create Notice Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ GET ALL NOTICES ------------------ */
router.get("/", async (req, res) => {
  try {
    const { category, priority } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    const notices = await Notice.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, notices });
  } catch (err) {
    console.error("Fetch Notices Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ GET NOTICE BY ID ------------------ */
router.get("/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ success: false, error: "Notice not found" });

    res.json({ success: true, notice });
  } catch (err) {
    console.error("Fetch Notice Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ UPDATE NOTICE ------------------ */
router.put("/:id", async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!notice) return res.status(404).json({ success: false, error: "Notice not found" });

    res.json({ success: true, notice });
  } catch (err) {
    console.error("Update Notice Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ DELETE NOTICE ------------------ */
router.delete("/:id", async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ success: false, error: "Notice not found" });

    res.json({ success: true, message: "Notice deleted successfully" });
  } catch (err) {
    console.error("Delete Notice Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;