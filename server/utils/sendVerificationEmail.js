import { Resend } from "resend";

const sendVerificationEmail = async (
    email,
    verificationToken
) => {

    console.log("EMAIL FUNCTION CALLED");
    console.log(email);

    const resend = new Resend(
        process.env.RESEND_API_KEY
    );

    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    const result =
        await resend.emails.send({

            from:
                "onboarding@resend.dev",

            to: email,

            subject:
                "Verify Your Email",

            html: `
            <h2>Welcome to Job Tracker</h2>

            <p>
                Please verify your email
                address.
            </p>

            <a href="${verificationUrl}">
                Verify Email
            </a>
        `,
        });

    if (result.error) {
        throw new Error(
            result.error.message
        );
    }
    console.log("RESEND RESULT:");
    console.log(result);

};

export default sendVerificationEmail;