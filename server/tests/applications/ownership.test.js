import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";
import {
    createUserAndToken
} from "../helpers/createUserAndToken.js";

describe(
    "Application Ownership",
    () => {

        it(
            "should prevent users from accessing other users applications",
            async () => {

                // USER A
                const userA =
                    await createUserAndToken(
                        "User A",
                        "a@test.com"
                    );

                // USER B
                const userB =
                    await createUserAndToken(
                        "User B",
                        "b@test.com"
                    );

                // USER A creates application
                const createdApp =
                    await request(app)
                        .post("/api/applications")
                        .set(
                            "Authorization",
                            `Bearer ${userA.token}`
                        )
                        .send({

                            company: "Google",

                            role: "Frontend Engineer",

                            status: "Applied",

                        });

                // USER B tries access
                const response =
                    await request(app)
                        .get(
                            `/api/applications/${createdApp.body.data._id}`
                        )
                        .set(
                            "Authorization",
                            `Bearer ${userB.token}`
                        );

                expect(response.statusCode)
                    .toBe(404);

            }
        );

        it(
            "should prevent users from updating other users applications",
            async () => {

                const userA =
                    await createUserAndToken(
                        "User A",
                        "usera@test.com"
                    );

                const userB =
                    await createUserAndToken(
                        "User B",
                        "userb@test.com"
                    );

                const createdApp =
                    await request(app)
                        .post("/api/applications")
                        .set(
                            "Authorization",
                            `Bearer ${userA.token}`
                        )
                        .send({

                            company: "Amazon",

                            role: "Backend Engineer",

                            status: "Applied",

                        });

                const response =
                    await request(app)
                        .put(
                            `/api/applications/${createdApp.body.data._id}`
                        )
                        .set(
                            "Authorization",
                            `Bearer ${userB.token}`
                        )
                        .send({

                            status: "Offer",

                        });

                expect(response.statusCode)
                    .toBe(404);

            }
        );
        it(
            "should prevent users from deleting other users applications",
            async () => {

                const userA =
                    await createUserAndToken(
                        "User A",
                        "owner@test.com"
                    );

                const userB =
                    await createUserAndToken(
                        "User B",
                        "intruder@test.com"
                    );

                const createdApp =
                    await request(app)
                        .post("/api/applications")
                        .set(
                            "Authorization",
                            `Bearer ${userA.token}`
                        )
                        .send({

                            company: "Netflix",

                            role: "Full Stack Engineer",

                            status: "Applied",

                        });

                const response =
                    await request(app)
                        .delete(
                            `/api/applications/${createdApp.body.data._id}`
                        )
                        .set(
                            "Authorization",
                            `Bearer ${userB.token}`
                        );

                expect(response.statusCode)
                    .toBe(404);

            }
        );

    }
);