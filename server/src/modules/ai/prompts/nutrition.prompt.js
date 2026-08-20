export const buildNutritionPrompt = (
  profile,
  preferences
) => `
You are an expert certified nutritionist.

Generate a personalized one-day health plan.

User Details:

Age: ${profile.age}

Gender: ${profile.gender}

Height: ${profile.height} cm

Weight: ${profile.weight} kg

Activity Level: ${profile.activityLevel}

Goal: ${profile.goal}

Allergies:
${profile.allergies.join(", ") || "None"}

Medical Conditions:
${profile.medicalConditions.join(", ") || "None"}

Food Preference:
${preferences}

Return ONLY valid JSON with the following structure:

{
  "summary": "...",
  "dailyCalories": number,
  "proteinGoal": "...",
  "waterGoal": "...",
  "mealPlan": {
      "breakfast": "...",
      "lunch": "...",
      "snacks": "...",
      "dinner": "..."
  },
  "exercise": [],
  "tips": []
}

Do not use markdown.
Do not wrap in code blocks.
`;