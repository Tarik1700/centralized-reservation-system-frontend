import Nav from "../Navbar/Nav";

import React from "react";
import SearchInput from "./SearchInput";
import Cards from "./Cards";
import Slider from "./Slider";
import restaurantSlides from "../../data/slides.json";

const Render = () => {
  const slides = restaurantSlides;

  return (
    <div>
      <SearchInput />
      <Slider slides={slides} />
      <Cards
        imgAlt="Meaningful alt text "
        imgSrc="/Images/fol.png"
        title="Restoran Park Prinčeva"
        description="Place that you must visit in Sarajevo."
        buttonLabel="Reserve"
        buttonColor="#157635"
        buttonOnClick={() => console.log("Button clicked!")}
      />
    </div>
  );
};
export default Render;
