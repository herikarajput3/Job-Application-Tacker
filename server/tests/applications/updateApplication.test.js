import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";
import { createUserAndToken } from "../helpers/createUserAndToken.js";

describe("PATCH /api/applications/:id", () => {

    it(
        "should update application successfully",
        async () => {

            const user =
                await createUserAndToken(
                    "Herika",
                    "update@test.com"
                );

            // Create application
            const createdApplication =
                await request(app)
                    .post("/api/applications")
                    .set(
                        "Authorization",
                        `Bearer ${user.token}`
                    )
                    .send({

                        company: "Google",

                        role: "Frontend Engineer",

                        status: "Applied",

                    });

            // Update application
            const response =
                await request(app)
                    .put(
                        `/api/applications/${createdApplication.body.data._id}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${user.token}`
                    )
                    .send({

                        status: "Interviewed",

                    });

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data.status)
                .toBe("Interview");

        }
    );

});