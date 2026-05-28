import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

import Application from "../models/Application.js";

dotenv.config();

const seedApplications = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const userId =
      new mongoose.Types.ObjectId(
        "6a1020f40b22a1b89bbf7402"
      );

    const applications = [];

    for (let i = 0; i < 10000; i++) {
      applications.push({
        user: userId,

        company: faker.company.name(),

        role: faker.person.jobTitle(),

        status: faker.helpers.arrayElement([
          "Saved",
          "Applied",
          "Assessment",
          "Interview Scheduled",
          "Interviewed",
          "Offer",
          "Rejected",
          "Ghosted",
        ]),

        location: faker.location.city(),

        notes: faker.lorem.sentence(),

        priority: faker.helpers.arrayElement([
          "Low",
          "Medium",
          "High",
        ]),
      });
    }

    await Application.insertMany(applications);

    console.log(
      "10,000 applications inserted successfully"
    );

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

seedApplications();