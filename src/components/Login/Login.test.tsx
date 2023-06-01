import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useMutation, UseMutationResult } from "react-query";
import { useNavigate } from "react-router-dom";

import Login from "./Login";

jest.mock("react-query");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  NavLink: () => <div />,
}));

describe("Login Component", () => {
  let mockMutate: jest.Mock;
  let mockNavigate: jest.Mock;

  /* eslint-disable testing-library/no-render-in-setup */
  beforeEach(() => {
    mockMutate = jest.fn();
    mockNavigate = jest.fn();

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Router>
        <Login />
      </Router>
    );
  });
  /* eslint-enable testing-library/no-render-in-setup */

  test("renders Login component", () => {
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("updates input fields and submits the form", () => {
    fireEvent.change(screen.getByPlaceholderText("Your email"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    expect(
      (screen.getByPlaceholderText("Your email") as HTMLInputElement).value
    ).toBe("test@gmail.com");
    expect(
      (screen.getByPlaceholderText("Password") as HTMLInputElement).value
    ).toBe("password");

    fireEvent.click(screen.getByText("Log In"));

    expect(mockMutate).toHaveBeenCalled();
  });
});
