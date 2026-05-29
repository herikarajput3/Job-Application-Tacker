import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../../app.js";
import { createUserAndToken } from "../helpers/createUserAndToken.js";
import { createApplication } from "../helpers/createApplication.js";

describe("Dashboard Route", () => {

    it(
        "should block unauthenticated access",
        async () => {

            const response =
                await request(app)
                    .get("/api/dashboard");

            expect(response.statusCode)
                .toBe(401);

        }
    );

    it(
        "should return empty dashboard stats for new user",
        async () => {

            const user =
                await createUserAndToken(
                    "Herika",
                    "empty@test.com"
                );

            const response =
                await request(app)
                    .get("/api/dashboard")
                    .set(
                        "Authorization",
                        `Bearer ${user.token}`
                    );

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.stats.total)
                .toBe(0);

            expect(response.body.stats.interviews)
                .toBe(0);

            expect(response.body.stats.offers)
                .toBe(0);

        }
    );
    it(
        "should calculate dashboard statistics correctly",
        async () => {

            const user =
                await createUserAndToken(
                    "Herika",
                    "stats@test.com"
                );

            const tomorrow = new Date();
            tomorrow.setDate(
                tomorrow.getDate() + 1
            );

            await createApplication(
                user.user.id,
                {
                    company: "Google",
                    status: "Offer",
                    priority: "High",
                }
            );

            await createApplication(
                user.user.id,
                {
                    company: "Amazon",
                    status: "Interview Scheduled",
                    priority: "Low",
                }
            );

            await createApplication(
                user.user.id,
                {
                    company: "Meta",
                    status: "Applied",
                    priority: "High",
                }
            );

            await createApplication(
                user.user.id,
                {
                    company: "Netflix",
                    status: "Applied",
                    priority: "Low",
                    followUpDate: tomorrow,
                }
            );

            const response =
                await request(app)
                    .get("/api/dashboard")
                    .set(
                        "Authorization",
                        `Bearer ${user.token}`
                    );

            expect(response.statusCode)
                .toBe(200);

            expect(
                response.body.stats.total
            ).toBe(4);

            expect(
                response.body.stats.interviews
            ).toBe(1);

            expect(
                response.body.stats.offers
            ).toBe(1);

            expect(
                response.body.stats.highPriority
            ).toBe(2);

            expect(
                response.body.stats.followUps
            ).toBe(1);

            expect(
                Number(
                    response.body.stats.offerRate
                )
            ).toBe(25);

        }
    );

    it(
        "should return only 5 recent applications",
        async () => {

            const user =
                await createUserAndToken(
                    "Herika",
                    "recent@test.com"
                );

            for (let i = 1; i <= 7; i++) {

                await createApplication(
                    user.user.id,
                    {
                        company: `Company ${i}`,
                        role: `Role ${i}`,
                    }
                );

            }

            const response =
                await request(app)
                    .get("/api/dashboard")
                    .set(
                        "Authorization",
                        `Bearer ${user.token}`
                    );

            expect(response.statusCode).toBe(200);

            expect(
                response.body.recentApplications.length
            ).toBe(5);

            expect(
                response.body.recentApplications[0].company
            ).toBe("Company 7");

            expect(
                response.body.recentApplications[4].company
            ).toBe("Company 3");
        }
    );

    it(
        "should return upcoming follow ups only",
        async () => {

            const user =
                await createUserAndToken(
                    "Herika",
                    "followup@test.com"
                );

            const tomorrow = new Date();
            tomorrow.setDate(
                tomorrow.getDate() + 1
            );

            const nextWeek = new Date();
            nextWeek.setDate(
                nextWeek.getDate() + 7
            );

            const yesterday = new Date();
            yesterday.setDate(
                yesterday.getDate() - 1
            );

            await createApplication(
                user.user.id,
                {
                    company: "Google",
                    followUpDate: tomorrow,
                }
            );

            await createApplication(
                user.user.id,
                {
                    company: "Amazon",
                    followUpDate: nextWeek,
                }
            );

            await createApplication(
                user.user.id,
                {
                    company: "Meta",
                    followUpDate: yesterday,
                }
            );

            const response =
                await request(app)
                    .get("/api/dashboard")
                    .set(
                        "Authorization",
                        `Bearer ${user.token}`
                    );

            expect(response.statusCode)
                .toBe(200);

            expect(
                response.body.upcomingFollowUps.length
            ).toBe(2);

            expect(
                response.body.upcomingFollowUps[0].company
            ).toBe("Google");

            expect(
                response.body.upcomingFollowUps[1].company
            ).toBe("Amazon");

        }
    );

});