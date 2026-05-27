import dotenv from "dotenv";
dotenv.config();

import request from "supertest";

import app from "../../app.js";

describe(
    "Protected Routes",
    () => {

        it(
            "should block unauthenticated access",
            async () => {

                const response =
                    await request(app)
                        .get("/api/applications");

                expect(response.statusCode)
                    .toBe(401);

                expect(response.body.success)
                    .toBe(false);

            }
        );

        it(
            "should reject invalid JWT token",
            async () => {

                const response =
                    await request(app)
                        .get("/api/applications")
                        .set(
                            "Authorization",
                            "Bearer invalidtoken"
                        );

                expect(response.statusCode)
                    .toBe(401);

                expect(response.body.success)
                    .toBe(false);

            }
        );
        it(
            "should reject missing authorization header",
            async () => {

                const response =
                    await request(app)
                        .get("/api/applications");

                expect(response.statusCode)
                    .toBe(401);

                expect(response.body.success)
                    .toBe(false);

            }
        );

    }
);