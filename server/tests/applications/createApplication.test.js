import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";
import { createUserAndToken } from "../helpers/createUserAndToken.js";

describe("POST/api/applications", () => {
    it(
        "should reject invalid application status",
        async () => {

            const user =
                await createUserAndToken(
                    "Herika",
                    "enum@test.com"
                );

            const response =
                await request(app)
                    .post("/api/applications")
                    .set(
                        "Authorization",
                        `Bearer ${user.token}`
                    )
                    .send({

                        company: "Google",

                        role: "Frontend Engineer",

                        status: "INVALID_STATUS",

                    });

            expect(response.statusCode)
                .toBe(400);

            expect(response.body.success)
                .toBe(false);

        }
    );

    it(
        "should reject invalid pagination values",
        async () => {

            const user =
                await createUserAndToken(
                    "Herika",
                    "pagination@test.com"
                );

            const response =
                await request(app)
                    .get(
                        "/api/applications?page=-1&limit=abc"
                    )
                    .set(
                        "Authorization",
                        `Bearer ${user.token}`
                    );

            expect(response.statusCode)
                .toBe(400);

        }
    );
})