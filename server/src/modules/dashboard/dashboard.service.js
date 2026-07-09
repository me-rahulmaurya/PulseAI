import User from "../auth/auth.model.js";
import HealthProfile from "../health/health.model.js";

import ApiError from "../../core/errors/ApiError.js";

import {
    calculateBMI,
    calculateBMR,
} from "../health/health.service.js";

const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
};

export const getDashboard = async (userId) => {

    const user = await User.findById(userId)
        .select("name email");

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const profile =
        await HealthProfile.findOne({
            user: userId,
        });

    if (!profile) {
        throw new ApiError(
            404,
            "Health profile not found."
        );
    }

    const bmi = calculateBMI(
        profile.height,
        profile.weight
    );

    const bmr = calculateBMR(
        profile.gender,
        profile.weight,
        profile.height,
        profile.age
    );

    const waterToday = await Water.aggregate([
  {
    $match: {
      user: user._id,
      consumedAt: {
        $gte: start,
        $lte: end,
      },
    },
  },
  {
    $group: {
      _id: null,
      total: {
        $sum: "$amount",
      },
    },
  },
]);

const waterConsumed =
  waterToday.length > 0
    ? waterToday[0].total
    : 0;
    
    return {
        user,

        health: {

            bmi,

            bmr,

            dailyCalories: Math.round(
                bmr *
                activityMultiplier[
                    profile.activityLevel
                ]
            ),

            waterGoal:
                profile.weight * 35,
        },

        today: {

            waterConsumed,

            medicationsPending: 0,
        },
    };
};