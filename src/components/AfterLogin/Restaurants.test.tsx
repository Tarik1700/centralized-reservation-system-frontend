/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Restaurants } from "./Restaurants";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../assets/images/arrow.png", () => "mocked-arrow-image");

describe("Restaurants", () => {
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

  it("renders restaurant items correctly", () => {
    const restaurantList = [
      {
        name: "Restaurant 1",
        image: "image-1.jpg",
        description: "Description 1",
      },
      {
        name: "Restaurant 2",
        image: "image-2.jpg",
        description: "Description 2",
      },
    ];

    mockedUseSelector.mockReturnValue({
      restaurantList,
    });

    render(<Restaurants />);

    const restaurantElements = screen.getAllByRole("heading", { level: 3 });

    expect(restaurantElements).toHaveLength(2);

    restaurantList.forEach((restaurant, index) => {
      const restaurantElement = restaurantElements[index];
      const imageElement = restaurantElement.querySelector("img");

      expect(restaurantElement).toHaveTextContent(restaurant.name);
      expect(restaurantElement.nextSibling).toHaveTextContent(
        restaurant.description
      );

      const arrowElement = restaurantElement.querySelector(
        'img[src="mocked-arrow-image"]'
      );
    });
  });

  it("navigates to the correct restaurant page on click", () => {
    const restaurantList = [
      {
        name: "Restaurant 1",
        image: "image-1.jpg",
        description: "Description 1",
      },
    ];

    const navigate = jest.fn();

    mockedUseSelector.mockReturnValue({
      restaurantList,
    });

    mockedUseNavigate.mockReturnValue(navigate);

    render(<Restaurants />);

    const restaurantElement = screen.getByText("Restaurant 1");

    fireEvent.click(restaurantElement);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/dashboard/restaurant/Restaurant 1");
  });

  // Add more tests for other scenarios as needed
});
