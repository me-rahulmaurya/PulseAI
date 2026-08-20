import asyncHandler from "../../shared/utils/asyncHandler.js";

import { sendSuccess } from "../../core/responses/sendResponse.js";

import {

    addMedication,

    getMedications,

    markMedicationTaken,

} from "./medication.service.js";

export const createMedication = asyncHandler(async (req,res)=>{

    console.log(req.body);

    const medicine =
        await addMedication(
            req.user._id,
            req.body
        );

    return sendSuccess(
        res,
        "Medication added.",
        medicine,
        201
    );

});

export const listMedication =
asyncHandler(async(req,res)=>{

    const medicines =
        await getMedications(
            req.user._id
        );

    return sendSuccess(
        res,
        "Medication list.",
        medicines
    );

});

export const takeMedication =
asyncHandler(async(req,res)=>{

    const medicine =
        await markMedicationTaken(
            req.user._id,
            req.params.id
        );

    return sendSuccess(
        res,
        "Medication marked as taken.",
        medicine
    );

});