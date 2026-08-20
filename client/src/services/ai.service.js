import api from "./api";

export const sendMessage = async (message) => {
    const res = await api.post("/ai/chat", {
        message,
    });

    return res.data.data;
};

export const generateNutrition = async (preferences) => {
    const res = await api.post("/ai/nutrition", {
        preferences,
    });

    return res.data.data;
};