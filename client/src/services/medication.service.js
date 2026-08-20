import api from "./api";

export const getMedications = async () => {
    const res = await api.get("/medications");
    return res.data.data;
};

export const addMedication = async (data) => {
    const res = await api.post("/medications", data);
    return res.data.data;
};

export const markTaken = async (id) => {
    const res = await api.patch(`/medications/${id}/take`);
    return res.data.data;
};