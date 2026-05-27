import request from "supertest";

import app from "../../app.js";

export const createUserAndToken =
    async (name, email) => {
        const response =
            await request(app)
                .post("/api/auth/register")
                .send({

                    name,

                    email,

                    password: "123456",

                });

        return {
            token: response.body.token,
            user: response.body.user,
        };

    };