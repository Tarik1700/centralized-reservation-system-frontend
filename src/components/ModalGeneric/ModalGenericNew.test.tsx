import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ModalGenericNew } from "./ModalGenericNew"; // update this import to your actual path

describe("ModalGenericNew", () => {
  const handleClose = jest.fn();
  const title = "Test Title";
  const testId = "modal";

  it("renders modal with title", () => {
    render(
      <ModalGenericNew
        isOpen={true}
        onClose={handleClose}
        title={title}
        data-testid={testId}
      >
        <div>Modal Content</div>
      </ModalGenericNew>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders modal with children", () => {
    render(
      <ModalGenericNew
        isOpen={true}
        onClose={handleClose}
        title={title}
        data-testid={testId}
      >
        <div>Modal Content</div>
      </ModalGenericNew>
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("handles close function when close button is clicked", () => {
    render(
      <ModalGenericNew
        isOpen={true}
        onClose={handleClose}
        title={title}
        data-testid={testId}
      >
        <div>Modal Content</div>
      </ModalGenericNew>
    );
    fireEvent.click(screen.getByText("×"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("renders footer if provided", () => {
    render(
      <ModalGenericNew
        isOpen={true}
        onClose={handleClose}
        title={title}
        footer={<div>Footer</div>}
      >
        <div>Modal Content</div>
      </ModalGenericNew>
    );
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
