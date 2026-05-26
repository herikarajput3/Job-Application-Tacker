import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import connectDB from "../../config/db.js";

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("POST/api/auth/register", () => {
    it("should register a new user", async () => {
        const response = await request(app).post("/api/auth/register")
            .send({
                name: "Herika",
                email: "herika@test.com",
                password: "123456",
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
    })
})