import Nav from '../../components/Navbar/Nav';

import React from 'react';
import SearchInput from './SearchInput';
import Cards from './Cards';
import Slider from './Slider';
import restaurantSlides from '../../data/slides.json';

const Render = () => {
  const slides = restaurantSlides;

  return (
    <div>
      <SearchInput />
      <Slider slides={slides} />
      <Cards
        imgAlt="Meaningful alt text "
        imgSrc="/Images/sejo.png"
        title="Brajlović"
        description="Bravo majstore, glaj kajmaka"
        buttonLabel="Reserve"
        buttonColor="#157635"
        buttonOnClick={() => console.log('Button clicked!')}
      />
    </div>
  );
};
export default Render;
