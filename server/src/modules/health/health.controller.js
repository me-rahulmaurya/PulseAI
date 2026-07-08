import asyncHandler from "../../shared/utils/asyncHandler.js";

import { sendSuccess } from "../../core/responses/sendResponse.js";

import {
  createHealthProfile,
  getHealthProfile,
  updateHealthProfile,
} from "./health.service.js";

export const createProfile = asyncHandler(
  async (req, res) => {
    const profile =
      await createHealthProfile(
        req.user._id,
        req.body
      );

    return sendSuccess(
      res,
      "Health profile created successfully.",
      profile,
      201
    );
  }
);

export const getProfile = asyncHandler(
  async (req, res) => {
    const data = await getHealthProfile(
      req.user._id
    );

    return sendSuccess(
      res,
      "Health profile fetched successfully.",
      data
    );
  }
);

export const updateProfile = asyncHandler(
  async (req, res) => {
    const profile =
      await updateHealthProfile(
        req.user._id,
        req.body
      );

    return sendSuccess(
      res,
      "Health profile updated successfully.",
      profile
    );
  }
);