import HealthProfile from "./health.model.js";
import ApiError from "../../core/errors/ApiError.js";

const activityMultiplier = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const calculateBMI = (height, weight) => {
  const h = height / 100;
  return Number((weight / (h * h)).toFixed(1));
};

export const calculateBMR = (
  gender,
  weight,
  height,
  age
) => {
  if (gender === "male") {
    return Math.round(
      10 * weight +
      6.25 * height -
      5 * age +
      5
    );
  }

  return Math.round(
    10 * weight +
      6.25 * height -
      5 * age -
      161
  );
};

export const createHealthProfile = async (
  userId,
  data
) => {
  const existing = await HealthProfile.findOne({
    user: userId,
  });

  if (existing) {
    throw new ApiError(
      409,
      "Health profile already exists."
    );
  }

  const profile = await HealthProfile.create({
    user: userId,
    ...data,
  });

  return profile;
};

export const getHealthProfile = async (
  userId
) => {
  const profile = await HealthProfile.findOne({
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

  const calories = Math.round(
    bmr *
      activityMultiplier[
        profile.activityLevel
      ]
  );

  const water = Math.round(
    profile.weight * 35
  );

  return {
    profile,
    calculations: {
      bmi,
      bmr,
      calories,
      water,
    },
  };
};

export const updateHealthProfile = async (
  userId,
  data
) => {
  const profile = await HealthProfile.findOne({
    user: userId,
  });

  if (!profile) {
    throw new ApiError(
      404,
      "Health profile not found."
    );
  }

  Object.assign(profile, data);

  await profile.save();

  return profile;
};