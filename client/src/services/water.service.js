import api from "./api";

export const getTodayWater = async () => {
    const res = await api.get("/water/today");
    return res.data.data;
};

export const addWater = async (amount) => {
    const res = await api.post("/water/drink", {
        amount,
    });

    return res.data.data;
};