import Application from "../../models/Application.js";

export const createApplication = async (
    userId,
    {
        company = "Google",
        role = "Software Engineer",
        status = "Applied",
        priority = "Medium",
        followUpDate = null,
    } = {}
) => {

    return await Application.create({
        user: userId,
        company,
        role,
        status,
        priority,
        followUpDate,
    });

};