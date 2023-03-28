import Nav from '../../components/Navbar/Nav';

import React from 'react';
import SearchInput from './SearchInput';
import Cards from './Cards';
import Slider from './Slider';

const Render = () => {
  const slides = [
    {
      imageUrl:
        'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1422&q=80',
      title: 'Saraybosna',
      buttonText: 'Button 1',
    },

    {
      imageUrl:
        'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1422&q=80',
      title: 'Seyo',
      buttonText: 'Button 2',
    },
  ];

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
