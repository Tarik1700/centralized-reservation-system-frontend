import Nav from './Nav';

import React from 'react';
import SearchInput from './SearchInput';
import Cards from './Cards';
import Slider from './Slider';

const Render = () => {
  const slides = [
    {
      imageUrl:
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'Manolo',
    },

    {
      imageUrl:
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      title: 'Maslina',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      title: 'Dos Hermanos',
    },
  ];

  return (
    <div>
      <Nav />
      <SearchInput />
      <Slider slides={slides} />
      <Cards
        imgAlt="Meaningful alt text "
        imgSrc="/Images/fol.png"
        title="Restoran Park Prinčeva "
        description="Place that you must visit in Sarajevo."
        buttonLabel="Reserve"
        buttonColor="#157635"
        buttonOnClick={() => console.log('Button clicked!')}
      />
    </div>
  );
};

export default Render;
