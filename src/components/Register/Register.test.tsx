import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "./Register";

// Mock react-query's useMutation hook
jest.mock("react-query", () => ({
  useMutation: () => ({
    mutate: jest.fn(),
  }),
}));

// Mock react-router-dom's useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

test("renders Register component", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  // Check if all the input fields are rendered
  expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Surname")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
});

test("updates input fields", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
  const surnameInput = screen.getByPlaceholderText(
    "Surname"
  ) as HTMLInputElement;
  const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText(
    "Password"
  ) as HTMLInputElement;
  const confirmPasswordInput = screen.getByPlaceholderText(
    "Confirm Password"
  ) as HTMLInputElement;

  fireEvent.change(nameInput, { target: { value: "John" } });
  expect(nameInput.value).toBe("John");

  fireEvent.change(surnameInput, { target: { value: "Doe" } });
  expect(surnameInput.value).toBe("Doe");

  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  expect(emailInput.value).toBe("john@example.com");

  fireEvent.change(passwordInput, { target: { value: "password123" } });
  expect(passwordInput.value).toBe("password123");

  fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  expect(confirmPasswordInput.value).toBe("password123");
});
