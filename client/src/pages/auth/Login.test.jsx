import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

const mockLogin = vi.fn();
vi.mock("../../context/AuthContext", () => ({
    useAuth: () => ({
        login: mockLogin,
        user: null,
        logout: vi.fn(),
    }),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

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

    test("calls login with form data on submit", async () => {
        const user = userEvent.setup();

        mockLogin.mockResolvedValue({
            user: {
                name: "Herika",
            },
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await user.type(
            screen.getByPlaceholderText(/email/i),
            "herika@test.com"
        );

        await user.type(
            screen.getByPlaceholderText(/password/i),
            "123456"
        );

        await user.click(
            screen.getByRole("button", {
                name: /sign in/i,
            })
        );

        expect(mockLogin).toHaveBeenCalledTimes(1);

        expect(mockLogin).toHaveBeenCalledWith({
            email: "herika@test.com",
            password: "123456",
        });
    });
});