import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";

describe(
    "POST /api/auth/login",
    () => {

        it(
            "should login a user",
            async () => {

                // Create user first
                await request(app)
                    .post("/api/auth/register")
                    .send({

                        name: "Test User",

                        email: "test@test.com",

                        password: "123456",

                    });

                // Then login
                const response =
                    await request(app)
                        .post("/api/auth/login")
                        .send({

                            email: "test@test.com",

                            password: "123456",

                        });

                expect(response.statusCode)
                    .toBe(200);

                expect(response.body.success)
                    .toBe(true);

            }
        );

        it(
            "should reject invalid credentials",
            async () => {

                const response =
                    await request(app)
                        .post("/api/auth/login")
                        .send({

                            email: "wrong@test.com",

                            password: "wrongpassword",

                        });

                expect(response.statusCode)
                    .toBe(401);

                expect(response.body.success)
                    .toBe(false);

            }
        );

        it(
            "should reject missing email/password",
            async () => {

                const response =
                    await request(app)
                        .post("/api/auth/login")
                        .send({});

                expect(response.statusCode)
                    .toBe(400);

                expect(response.body.success)
                    .toBe(false);

            }
        );

    }
);