import express from "express";
import Report from "../models/Report.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

/* ------------------ CREATE NEW REPORT ------------------ */
router.post("/", async (req, res) => {
  try {
    const reportId = uuidv4(); // unique long ID

    const data = {
      ...req.body,
      reportId,
      status: "Received",
      createdAt: new Date(),
    };

    const report = await Report.create(data);

    res.json({ success: true, report });
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ GET ALL REPORTS ------------------ */
router.get("/all", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json({ success: true, reports });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ ADVANCE STATUS ------------------ */
const NEXT_STATUS = {
  Received: "Assigned",
  Assigned: "In Progress",
  "In Progress": "Resolved",
  Resolved: "Resolved",
  Reopened: "Assigned",
};

router.patch("/advance/:reportId", async (req, res) => {
  try {
    const report = await Report.findOne({ reportId: req.params.reportId });

    if (!report) return res.json({ success: false, error: "Not found" });

    const next = NEXT_STATUS[report.status] || "Received";

    report.status = next;
    await report.save();

    res.json({ success: true, report });
  } catch (err) {
    console.error("Advance Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ------------------ REOPEN COMPLAINT ------------------ */
router.patch("/reopen/:reportId", async (req, res) => {
  try {
    const report = await Report.findOne({ reportId: req.params.reportId });

    if (!report) return res.json({ success: false, error: "Not found" });

    report.status = "Reopened";
    await report.save();

    res.json({ success: true, report });
  } catch (err) {
    console.error("Reopen Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
