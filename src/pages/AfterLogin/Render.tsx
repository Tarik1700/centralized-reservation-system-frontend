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
      <Cards  imgAlt="Meaningful alt text "
        imgSrc="/Images/sejo.png"
        title="Brajlović"
        description="Bravo majstore, glaj kajmaka"
        buttonLabel="Reserve"
        buttonColor="#157635"
        buttonOnClick={() => console.log("Button clicked!")}
      />
      

    </div>
  );
}

export default Render;
