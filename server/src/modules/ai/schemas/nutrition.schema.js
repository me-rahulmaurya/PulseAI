export const nutritionSchema = {
  type: "object",

  properties: {

    summary: {
      type: "string"
    },

    dailyCalories: {
      type: "number"
    },

    proteinGoal: {
      type: "string"
    },

    waterGoal: {
      type: "string"
    },

    mealPlan: {

      type: "object",

      properties: {

        breakfast: {
          type: "string"
        },

        lunch: {
          type: "string"
        },

        snacks: {
          type: "string"
        },

        dinner: {
          type: "string"
        }

      }
    },

    exercise: {

      type: "array",

      items: {

        type: "string"

      }

    },

    tips: {

      type: "array",

      items: {

        type: "string"

      }

    }

  }
};