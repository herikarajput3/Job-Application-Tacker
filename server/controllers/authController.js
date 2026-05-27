import User from "../models/User.js"
import asyncHandler from "../middleware/async.js"
import ErrorResponse from "../utils/errorResponse.js"
import generateToken from "../utils/jwt.js";

export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check existing user 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ErrorResponse("User already exists", 400);
    }
    console.log(existingUser, "existing user");

    // Create user
    const user = await User.create({ name, email, password });
    console.log(user, "user created");
    // Generate token
    const token = generateToken(user._id);
    console.log(token, "token generated");
    res.status(201).json({
        success: true,
        message: "User created successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Validate fields
    if (!email || !password) {
        throw new ErrorResponse("Please provide email and password", 400);
    }

    // find user & include password
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
        throw new ErrorResponse("Invalid credentials", 401);
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new ErrorResponse("Invalid credentials", 401);
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
})

export const getMe = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
            user: req.user,
        });

    }
);