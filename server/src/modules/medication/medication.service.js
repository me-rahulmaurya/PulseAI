import Medication from "./medication.model.js";

import ApiError from "../../core/errors/ApiError.js";

export const addMedication = async (
    userId,
    data
) => {

    return await Medication.create({
        user: userId,
        ...data,
    });

};

export const getMedications = async (
    userId
) => {

    return await Medication.find({
        user: userId,
        active: true,
    }).sort({
        time: 1,
    });

};

export const markMedicationTaken =
async (
    userId,
    medicationId
) => {

    const medicine =
        await Medication.findOne({
            _id: medicationId,
            user: userId,
        });

    if (!medicine)
        throw new ApiError(
            404,
            "Medication not found."
        );

    medicine.lastTakenAt =
        new Date();

    await medicine.save();

    return medicine;

};