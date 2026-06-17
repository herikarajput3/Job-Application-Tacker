import User from "../models/User.js"
import asyncHandler from "../middleware/async.js"
import ErrorResponse from "../utils/errorResponse.js"
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwt.js";
import {
    refreshCookieOptions,
} from "../utils/cookieOptions.js";
import jwt from "jsonwebtoken";

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
    const accessToken =
        generateAccessToken(user._id);
    const refreshToken =
        generateRefreshToken(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    res.cookie(
        "refreshToken",
        refreshToken,
        refreshCookieOptions
    );

    res.status(201).json({
        success: true,
        message: "User created successfully",
        token: accessToken,
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
    const accessToken =
        generateAccessToken(user._id);

    const refreshToken =
        generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.cookie(
        "refreshToken",
        refreshToken,
        refreshCookieOptions
    );

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
})

export const refreshAccessToken =
    asyncHandler(async (req, res) => {
        const refreshToken =
            req.cookies.refreshToken;

        if (!refreshToken) {
            throw new ErrorResponse(
                "Refresh token missing",
                401
            );
        }

        let decoded;

        try {

            decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
            );

        } catch (error) {

            throw new ErrorResponse(
                "Invalid refresh token",
                401
            );

        }

        const user = await User.findById(decoded.id);

        if (!user) {
            throw new ErrorResponse("User not found", 401);
        }

        if (user.refreshToken !== refreshToken) {
            throw new ErrorResponse("Invalid refresh token", 401);
        }

        const accessToken =
            generateAccessToken(user._id);

        const newRefreshToken =
            generateRefreshToken(user._id);

        user.refreshToken =
            newRefreshToken;

        await user.save({
            validateBeforeSave: false,
        });

        res.cookie(
            "refreshToken",
            newRefreshToken,
            refreshCookieOptions
        );

        res.status(200).json({
            success: true,
            token: accessToken,
        });
    });

export const getMe = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
            user: req.user,
        });

    }
);

export const logout = asyncHandler(
    async (req, res) => {

        const refreshToken =
            req.cookies.refreshToken;

        if (refreshToken) {

            const user =
                await User.findOne({
                    refreshToken,
                });

            if (user) {

                user.refreshToken = null;

                await user.save({
                    validateBeforeSave: false,
                });

            }

        }

        res.clearCookie(
            "refreshToken",
            refreshCookieOptions
        );

        res.status(200).json({
            success: true,
            message:
                "Logged out successfully",
        });

    }
);