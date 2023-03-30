import Nav from '../Navbar/Nav';

import React from 'react';
import SearchInput from './SearchInput';
import Cards from './Cards';
import Slider from './Slider';
import restaurantSlides from '../../data/slides.json';
import { useNavigate } from 'react-router-dom';

const Render = () => {
  const slides = restaurantSlides;
  const navigate = useNavigate();

  return (
    <div className="bg-[#FBFBF9] pb-4">
      <SearchInput />
      <Slider slides={slides} />
      <Cards
        imgAlt="Meaningful alt text "
        imgSrc="/Images/fol.png"
        title="Restoran Park Prinčeva"
        description="Place that you must visit in Sarajevo."
        buttonLabel="Reserve"
        buttonColor="#157635"
        buttonOnClick={() => navigate('/dashboard/restaurant')}
      />
    </div>
  );
};
export default Render;
