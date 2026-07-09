import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    dosage: {
      type: String,
      default: "",
    },

    frequency: {
      type: String,
      enum: [
        "once",
        "twice",
        "thrice",
      ],
      default: "once",
    },

    time: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    lastTakenAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Medication",
  medicationSchema
);