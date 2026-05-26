import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";

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

    it("should reject duplicate email registration", async () => {
        // first user
        await request(app)
            .post("/api/auth/register")
            .send({

                name: "Herika",

                email: "duplicate@test.com",

                password: "123456",

            });

        // Duplicate user
        const response =
            await request(app)
                .post("/api/auth/register")
                .send({

                    name: "Another",

                    email: "duplicate@test.com",

                    password: "123456",

                });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    })
})