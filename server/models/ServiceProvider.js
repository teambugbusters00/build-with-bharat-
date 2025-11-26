import mongoose from "mongoose";

const ServiceProviderSchema = new mongoose.Schema({
  providerId: String,

  name: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  serviceType: {
    type: String,
    required: true,
  },

  experience: {
    type: String,
    required: true,
  },

  coords: {
    lat: Number,
    lon: Number,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ServiceProvider", ServiceProviderSchema);
