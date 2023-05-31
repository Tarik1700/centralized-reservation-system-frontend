/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Select from "./Select";

describe("Select", () => {
  const options = [
    { value: "value1", label: "Label 1" },
    { value: "value2", label: "Label 2" },
    { value: "value3", label: "Label 3" },
  ];

  const mockOnChange = jest.fn();

  it("calls onChange function when an option is selected", () => {
    const { getByRole } = render(
      <Select options={options} onChange={mockOnChange} />
    );

    fireEvent.change(getByRole("combobox"), { target: { value: "value2" } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
