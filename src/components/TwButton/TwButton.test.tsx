/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TwButton } from "./TwButton";

describe("TwButton", () => {
  it("renders button with children and click event handler", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <TwButton onClick={handleClick}>Click Me</TwButton>
    );

    const buttonElement = getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies additional className to the button", () => {
    const { container } = render(
      <TwButton className="custom-class">Custom Button</TwButton>
    );

    const buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("custom-class");
  });

  // Add more tests for other props and scenarios as needed
});
