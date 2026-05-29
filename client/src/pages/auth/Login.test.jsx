import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

vi.mock("../../context/AuthContext", () => ({
    useAuth: () => ({
        login: vi.fn(),
        user: null,
        logout: vi.fn(),
    }),
}));

describe("Login Page", () => {
    test("renders login form", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(
            screen.getByPlaceholderText(/email/i)
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText(/password/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /sign in/i,
            })
        ).toBeInTheDocument();
    });

    test("allows user to type in email and password", async () => {
        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const emailInput =
            screen.getByPlaceholderText(/email/i);

        const passwordInput =
            screen.getByPlaceholderText(/password/i);

        await user.type(
            emailInput,
            "john@gmail.com"
        );

        await user.type(
            passwordInput,
            "123456"
        );

        expect(emailInput).toHaveValue(
            "john@gmail.com"
        );

        expect(passwordInput).toHaveValue(
            "123456"
        );
    });

    test("toggles password visibility", async () => {
        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const passwordInput =
            screen.getByPlaceholderText(/password/i);

        const toggleButton =
            screen.getByRole("button", {
                name: /toggle password visibility/i,
            });

        // Initially hidden
        expect(passwordInput)
            .toHaveAttribute(
                "type",
                "password"
            );

        // Show password
        await user.click(toggleButton);

        expect(passwordInput)
            .toHaveAttribute(
                "type",
                "text"
            );

        // Hide password again
        await user.click(toggleButton);

        expect(passwordInput)
            .toHaveAttribute(
                "type",
                "password"
            );
    });
});