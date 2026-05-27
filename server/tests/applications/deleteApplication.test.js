import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";
import { createUserAndToken } from "../helpers/createUserAndToken.js";

describe("DELETE /api/applications/:id", () => {
    it(
        "should delete application successfully",
        async () => {

            const user =
                await createUserAndToken(
                    "Herika",
                    "delete@test.com"
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

                        company: "Amazon",

                        role: "Backend Engineer",

                        status: "Applied",

                    });

            // Delete application
            const response =
                await request(app)
                    .delete(
                        `/api/applications/${createdApplication.body.data._id}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${user.token}`
                    );

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

        }
    );

});