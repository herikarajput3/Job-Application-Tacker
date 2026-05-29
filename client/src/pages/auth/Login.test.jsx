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
});