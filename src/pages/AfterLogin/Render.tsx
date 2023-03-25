import Nav from "./Nav";

import React from 'react'
import SearchInput from "./SearchInput";
import Popular from "./Popular";
import Cards from "./Cards";




  const Render = () => {
    
   
      
  return (
    <div>
      <Nav></Nav>
      <SearchInput/>
      <Popular ></Popular>
      <Cards  imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg"
        title="Noteworthy technology acquisitions 2021"
        description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        buttonLabel="Reserve"
        buttonColor="#157635"
        buttonOnClick={() => console.log("Button clicked!")}
      />
    </div>
  );
}

export default Render;
