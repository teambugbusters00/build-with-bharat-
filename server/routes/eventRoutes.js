import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

/* ------------------ CREATE NEW EVENT ------------------ */
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json({ success: true, event });
  } catch (err) {
    console.error("Create Event Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ GET ALL EVENTS ------------------ */
router.get("/", async (req, res) => {
  try {
    const { category, status, upcoming } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (upcoming === "true") {
      filter.date = { $gte: new Date() };
      filter.status = { $ne: "cancelled" };
    }

    const events = await Event.find(filter).sort({ date: 1, time: 1 });
    res.json({ success: true, events });
  } catch (err) {
    console.error("Fetch Events Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ GET EVENT BY ID ------------------ */
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, error: "Event not found" });

    res.json({ success: true, event });
  } catch (err) {
    console.error("Fetch Event Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ UPDATE EVENT ------------------ */
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!event) return res.status(404).json({ success: false, error: "Event not found" });

    res.json({ success: true, event });
  } catch (err) {
    console.error("Update Event Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ DELETE EVENT ------------------ */
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, error: "Event not found" });

    res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete Event Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ GET UPCOMING EVENTS ------------------ */
router.get("/upcoming/all", async (req, res) => {
  try {
    const events = await Event.find({
      date: { $gte: new Date() },
      status: { $ne: "cancelled" }
    }).sort({ date: 1, time: 1 }).limit(10);

    res.json({ success: true, events });
  } catch (err) {
    console.error("Fetch Upcoming Events Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;