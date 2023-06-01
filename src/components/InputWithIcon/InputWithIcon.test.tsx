import { render, screen, fireEvent } from "@testing-library/react";
import { InputWithIcon } from "./InputWithIcon";

describe("InputWithIcon", () => {
  it("renders input element with provided props", () => {
    const placeholder = "Enter your name";
    const value = "John Doe";
    const onChange = jest.fn();

    render(
      <InputWithIcon
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name="name"
        labelBaseClasses=""
        labelErrorClasses=""
        labelSuccessClasses=""
        inputBaseClasses=""
        inputErrorClasses=""
        inputSuccessClasses=""
        inputSizing=""
      />
    );

    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(value);

    fireEvent.change(inputElement, { target: { value: "Jane Smith" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("displays label when provided", () => {
    const label = "Full Name";

    render(
      <InputWithIcon
        label={label}
        name="name"
        labelBaseClasses=""
        labelErrorClasses=""
        labelSuccessClasses=""
        inputBaseClasses=""
        inputErrorClasses=""
        inputSuccessClasses=""
        inputSizing=""
      />
    );

    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it("displays error message when error prop is provided", () => {
    const error = "Invalid input";

    render(
      <InputWithIcon
        error={error}
        name="name"
        labelBaseClasses=""
        labelErrorClasses=""
        labelSuccessClasses=""
        inputBaseClasses=""
        inputErrorClasses=""
        inputSuccessClasses=""
        inputSizing=""
      />
    );

    const errorMessage = screen.getByText(error);
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders left and right icons when provided", () => {
    const leftIcon = <span data-testid="left-icon">🔍</span>;
    const rightIcon = <span data-testid="right-icon">✏️</span>;

    render(
      <InputWithIcon
        name="name"
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        labelBaseClasses=""
        labelErrorClasses=""
        labelSuccessClasses=""
        inputBaseClasses=""
        inputErrorClasses=""
        inputSuccessClasses=""
        inputSizing=""
      />
    );

    const leftIconElement = screen.getByTestId("left-icon");
    const rightIconElement = screen.getByTestId("right-icon");

    expect(leftIconElement).toBeInTheDocument();
    expect(rightIconElement).toBeInTheDocument();
  });

  // Add more tests for other scenarios as needed
});
