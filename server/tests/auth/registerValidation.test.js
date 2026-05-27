import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";

describe("Register Validation Tests", () => {

    it(
        "should reject invalid email format",
        async () => {

            const response =
                await request(app)
                    .post("/api/auth/register")
                    .send({

                        name: "Herika",

                        email: "invalid-email",

                        password: "123456",

                    });

            expect(response.statusCode)
                .toBe(400);

            expect(response.body.success)
                .toBe(false);

        }
    );

    it(
        "should reject weak password",
        async () => {

            const response =
                await request(app)
                    .post("/api/auth/register")
                    .send({

                        name: "Herika",

                        email: "weak@test.com",

                        password: "123",

                    });

            expect(response.statusCode)
                .toBe(400);

            expect(response.body.success)
                .toBe(false);

        }
    );

});