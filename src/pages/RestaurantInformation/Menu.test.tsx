/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import Menu from "./Menu";
import IMenu from "../../interfaces/IMenu";

describe("Menu", () => {
  const menuItem: IMenu = {
    name: "Burger",
    price: 10,
    image: "burger.jpg",
    category: "BEVERAGE",
  };

  it("renders menu item with correct name", () => {
    const { getByText } = render(<Menu menuItem={menuItem} />);

    const nameElement = getByText("Burger");

    expect(nameElement).toBeInTheDocument();
  });

  it("renders menu item with correct price", () => {
    const { getByText } = render(<Menu menuItem={menuItem} />);

    const priceElement = getByText("10 KM");

    expect(priceElement).toBeInTheDocument();
  });

  it("renders menu item with proper CSS classes", () => {
    const { container } = render(<Menu menuItem={menuItem} />);

    const menuItemElement = container.firstChild;

    expect(menuItemElement).toHaveClass("menu-item");
    expect(menuItemElement).toHaveClass("mx-4");
    expect(menuItemElement).toHaveClass("border-[#ECECEC]");
    expect(menuItemElement).toHaveClass("border-[1px]");
    expect(menuItemElement).toHaveClass("rounded-lg");
    expect(menuItemElement).toHaveClass("h-32");
    expect(menuItemElement).toHaveClass("mb-4");
    expect(menuItemElement).toHaveClass("flex");
    expect(menuItemElement).toHaveClass("justify-between");
    expect(menuItemElement).toHaveClass("items-center");
  });
});
