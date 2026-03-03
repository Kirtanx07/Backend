import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
    console.log("Request reached controller");

    res.status(200).json({
        message: "Kirtan ka Backend Environment"
    });
});