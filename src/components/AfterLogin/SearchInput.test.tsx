import { render, fireEvent, screen } from "@testing-library/react";
import { useNavigate } from "react-router";
import SearchInput from "./SearchInput";

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

describe("SearchInput", () => {
  const navigateMock = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigateMock);

  test("should navigate to the correct URL on form submission", () => {
    render(<SearchInput />);
    const searchInput = screen.getByPlaceholderText("Search");
    const form = screen.getByTestId("search-form");

    fireEvent.change(searchInput, { target: { value: "restaurant-name" } });
    fireEvent.submit(form);

    expect(navigateMock).toHaveBeenCalledWith(
      "/dashboard/restaurant/restaurant-name"
    );
  });
});
