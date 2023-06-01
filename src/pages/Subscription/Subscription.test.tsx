/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Subscription from "./Subscription";
import { RootState } from "../../store";
import "@testing-library/jest-dom/extend-expect"; // Import the extend-expect module

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../assets/images/tick.svg", () => "mocked-tick-image");

describe("Subscription", () => {
  const mockedUseSelector = useSelector as jest.MockedFunction<
    typeof useSelector
  >;
  const mockedUseNavigate = useNavigate as jest.MockedFunction<
    typeof useNavigate
  >;

  beforeEach(() => {
    mockedUseSelector.mockClear();
    mockedUseNavigate.mockClear();
  });

  it("renders active subscription for owner role", () => {
    mockedUseSelector.mockReturnValue({
      user: {
        role: "OWNER",
      },
    });

    const { getByText, queryByText } = render(<Subscription />);

    expect(getByText("Subscription")).toBeInTheDocument();
    expect(getByText("Your subscription is active!")).toBeInTheDocument();
    expect(
      queryByText(
        "To register your restaurants, please complete the payment process."
      )
    ).not.toBeInTheDocument();
  });

  it("renders subscription details and payment button for non-owner role", () => {
    mockedUseSelector.mockReturnValue({
      user: {
        role: "USER",
      },
    });

    const { getByText } = render(<Subscription />);

    expect(getByText("Subscription")).toBeInTheDocument();
    expect(
      getByText(
        "To register your restaurants, please complete the payment process."
      )
    ).toBeInTheDocument();
    expect(getByText("Up to 3 restaurants")).toBeInTheDocument();
    expect(getByText("Unlimited support")).toBeInTheDocument();
    expect(getByText("5 staff members per restaurant")).toBeInTheDocument();
    expect(getByText("Proceed to payment")).toBeInTheDocument();
  });

  it("navigates to payment page when payment button is clicked", () => {
    const navigate = jest.fn();

    mockedUseSelector.mockReturnValue({
      user: {
        role: "USER",
      },
    });

    mockedUseNavigate.mockReturnValue(navigate);

    const { getByText } = render(<Subscription />);

    const paymentButton = getByText("Proceed to payment");
    fireEvent.click(paymentButton);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/subscription/payment");
  });

  // Add more tests for other scenarios as needed
});
