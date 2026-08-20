import api from "./api";

export const getProfile = async () => {
    const res = await api.get("/health/profile");
    return res.data.data;
};

export const createProfile = async (data) => {
    const res = await api.post("/health/profile", data);
    return res.data.data;
};

export const updateProfile = async (data) => {
    const res = await api.put("/health/profile", data);
    return res.data.data;
};