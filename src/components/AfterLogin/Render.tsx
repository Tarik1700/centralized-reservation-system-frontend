import { useState } from "react";
import SearchInput from "./SearchInput";
import Cards from "./Cards";
import Slider from "./Slider";
import restaurantSlides from "../../data/slides.json";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";

const Render = () => {
  const slides = restaurantSlides;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="pb-4 ">
      <ClipLoader
        size={120}
        color={"green"}
        aria-label="Loading Spinner"
        data-testid="loader"
        loading={loading}
        className="mt-28"
      />
      {!loading && (
        <>
          <SearchInput />
          <Slider slides={slides} />
          <Cards
            imgAlt="Meaningful alt text "
            imgSrc="/Images/fol.png"
            title="Restoran Park Prinčeva"
            description="Place that you must visit in Sarajevo."
            buttonLabel="Reserve"
            buttonColor="#157635"
            buttonOnClick={() => navigate("/dashboard/restaurant")}
          />
        </>
      )}
    </div>
  );
};
export default Render;
