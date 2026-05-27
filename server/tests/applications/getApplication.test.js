import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";
import { createUserAndToken } from "../helpers/createUserAndToken.js";

describe("GET/api/applications", () => {
    it("should get all applications", async () => {

        const user =
            await createUserAndToken(
                "Herika",
                "herika@test.com"
            );

        const response =
            await request(app)
                .get("/api/applications")
                .set(
                    "Authorization",
                    `Bearer ${user.token}`
                );

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toBeDefined();

    });
    it(
        "should reject invalid MongoDB ObjectId",
        async () => {

            const user =
                await createUserAndToken(
                    "Herika",
                    "herika@test.com"
                );

            const response =
                await request(app)
                    .get("/api/applications/invalid-id")
                    .set(
                        "Authorization",
                        `Bearer ${user.token}`
                    );

            expect(response.statusCode)
                .toBe(404);

            expect(response.body.success)
                .toBe(false);

        }
    );
});