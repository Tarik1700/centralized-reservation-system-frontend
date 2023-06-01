/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders with default styles", () => {
    const { container } = render(<Divider />);
    const dividerElement = container.firstChild;

    expect(dividerElement).toBeInTheDocument();
    expect(dividerElement).toHaveClass("border-t border-solid border-gray-200");
    expect(dividerElement).not.toHaveClass("custom-class");
  });

  it("renders with additional custom class", () => {
    const { container } = render(<Divider className="custom-class" />);
    const dividerElement = container.firstChild;

    expect(dividerElement).toBeInTheDocument();
    expect(dividerElement).toHaveClass(
      "border-t border-solid border-gray-200 custom-class"
    );
  });
});
