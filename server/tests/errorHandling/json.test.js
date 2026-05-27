import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";
import { createUserAndToken } from "../helpers/createUserAndToken.js";
describe("Error Handling", () => {
    it(
        "should handle malformed JSON safely",
        async () => {

            const response =
                await request(app)
                    .post("/api/auth/login")
                    .set(
                        "Content-Type",
                        "application/json"
                    )
                    .send('{"invalidJson": }');

            expect(response.statusCode)
                .toBe(400);

        }
    );
})