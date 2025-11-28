import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
  },
  endTime: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  coords: {
    lat: Number,
    lon: Number,
  },
  category: {
    type: String,
    enum: ["cultural", "educational", "sports", "health", "community", "other"],
    default: "other",
  },
  organizer: {
    type: String,
  },
  contactInfo: {
    type: String,
  },
  maxAttendees: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "cancelled"],
    default: "upcoming",
  },
  createdBy: {
    type: String,
    default: "Admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Event", EventSchema);