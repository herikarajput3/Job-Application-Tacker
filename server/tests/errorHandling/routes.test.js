import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";
import { createUserAndToken } from "../helpers/createUserAndToken.js";

describe("Route Error Handling", () => {
    it(
        "should return 404 for unknown routes",
        async () => {

            const response =
                await request(app)
                    .get("/api/unknown-route");

            expect(response.statusCode)
                .toBe(404);

        }
    );
});