import express from "express";
import Schedule from "../models/Schedule.js";

const router = express.Router();

/* ------------------ CREATE NEW SCHEDULE ------------------ */
router.post("/", async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.json({ success: true, schedule });
  } catch (err) {
    console.error("Create Schedule Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ GET ALL SCHEDULES ------------------ */
router.get("/", async (req, res) => {
  try {
    const { category, status, date } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const schedules = await Schedule.find(filter).sort({ date: 1, time: 1 });
    res.json({ success: true, schedules });
  } catch (err) {
    console.error("Fetch Schedules Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ GET SCHEDULE BY ID ------------------ */
router.get("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ success: false, error: "Schedule not found" });

    res.json({ success: true, schedule });
  } catch (err) {
    console.error("Fetch Schedule Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ UPDATE SCHEDULE ------------------ */
router.put("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!schedule) return res.status(404).json({ success: false, error: "Schedule not found" });

    res.json({ success: true, schedule });
  } catch (err) {
    console.error("Update Schedule Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ DELETE SCHEDULE ------------------ */
router.delete("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ success: false, error: "Schedule not found" });

    res.json({ success: true, message: "Schedule deleted successfully" });
  } catch (err) {
    console.error("Delete Schedule Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ GET WEEKLY SCHEDULE ------------------ */
router.get("/weekly/current", async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of week (Saturday)

    const schedules = await Schedule.find({
      date: { $gte: startOfWeek, $lte: endOfWeek },
      status: { $ne: "cancelled" }
    }).sort({ date: 1, time: 1 });

    res.json({ success: true, schedules });
  } catch (err) {
    console.error("Fetch Weekly Schedule Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;