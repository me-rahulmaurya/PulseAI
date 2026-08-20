import HealthProfile from "../health/health.model.js";
import ApiError from "../../core/errors/ApiError.js";

import { generateText } from "../../shared/ai/provider.js";

import { buildHealthAssistantPrompt } from "./prompts/chat.prompt.js";
import { buildNutritionPrompt } from "./prompts/nutrition.prompt.js";

export const healthChat = async (
  userId,
  message
) => {
  const profile = await HealthProfile.findOne({
    user: userId,
  });

  if (!profile) {
    throw new ApiError(
      404,
      "Please complete your health profile first."
    );
  }

  const prompt = buildHealthAssistantPrompt(
    profile,
    message
  );

  const reply = await generateText(prompt);

  return { reply };
};

export const nutritionPlan = async (
  userId,
  preferences
) => {
  const profile = await HealthProfile.findOne({
    user: userId,
  });

  if (!profile) {
    throw new ApiError(
      404,
      "Please complete your health profile first."
    );
  }

  const prompt = buildNutritionPrompt(
    profile,
    preferences
  );

  const result = await generateText(prompt);

  try {
    return JSON.parse(result);
  } catch {
    throw new ApiError(
      500,
      "AI returned an invalid nutrition response."
    );
  }
};

