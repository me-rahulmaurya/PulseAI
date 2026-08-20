import mongoose from "mongoose";

const healthProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    activityLevel: {
      type: String,
      enum: [
        "sedentary",
        "light",
        "moderate",
        "active",
        "very_active",
      ],
      required: true,
    },

    goal: {
      type: String,
      enum: [
        "lose_weight",
        "maintain",
        "gain_weight",
      ],
      required: true,
    },

    allergies: {
      type: [String],
      default: [],
    },

    medicalConditions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "HealthProfile",
  healthProfileSchema
);