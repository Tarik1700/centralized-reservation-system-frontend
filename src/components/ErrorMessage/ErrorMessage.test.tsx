/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders with default styles", () => {
    const { getByText } = render(<ErrorMessage msg="Error message" />);
    const errorMessageElement = getByText("Error message");

    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveClass("text-red-600 text-xs");
    expect(errorMessageElement).not.toHaveClass("custom-class");
  });

  it("renders with additional custom class", () => {
    const { getByText } = render(
      <ErrorMessage msg="Error message" className="custom-class" />
    );
    const errorMessageElement = getByText("Error message");

    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveClass(
      "text-red-600 text-xs custom-class"
    );
  });
});
