import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  reportId: String,
  name: String,
  phone: String,
  location: String,
  coords: {
    lat: Number,
    lon: Number,
  },
  issue: String,
  description: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Report", ReportSchema);
