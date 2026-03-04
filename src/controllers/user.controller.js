import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../../models/user.model.js"; // Corrected relative path
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // 1. Get user details from frontend
    const { fullName, email, username, password } = req.body;

    // 2. Validation - Not Empty
    if ([fullName, email, username, password].some(
        (field) => field?.trim() === ""
    )) {
        throw new ApiError(400, "All fields are required");
    }

    // 3. Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User Exists Already");
    }

    // 4. Extract local file paths provided by Multer
    const avtarlocalPath = req.files?.avtar?.[0]?.path;
    const coverImagePath = req.files?.coverImage?.[0]?.path;

    if (!avtarlocalPath) {
        throw new ApiError(400, "Avatar file is Required!");
    }

    // 5. Upload files to Cloudinary
    const avtar = await uploadOnCloudinary(avtarlocalPath);
    const coverImage = await uploadOnCloudinary(coverImagePath);

    // Verify avatar upload succeeded
    if (!avtar) {
        throw new ApiError(400, "Error while uploading avatar to Cloudinary");
    }

    // 6. Create user entry in database
    const user = await User.create({
        fullName,
        avtar: avtar.url,
        coverImage: coverImage?.url || "", // Corrected to match model field name 'coverimage'
        email,
        password,
        username: username.toLowerCase()
    });

    // 7. Remove sensitive fields from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // 8. Check for successful user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // 9. Return success response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User Registered Successfully")
    );
});

export { registerUser };