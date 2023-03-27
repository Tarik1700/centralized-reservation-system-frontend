import React, { useState, useEffect } from "react";
import { TwButton } from "../../components/TwButton/TwButton";

interface Slide {
  imageUrl: string;
  title: string;
}

interface Props {
  slides: Slide[];
}

const Slider: React.FC<Props> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(intervalId);
  }, [currentSlide, slides.length]);

  return (
    <>
      <h3 className="text-2xl text-left px-3 text-black pb-3 ">Popular</h3>
      <div className=" relative px-3   ">
        
          <div
            className=" relative bg-cover bg-center h-auto text-white py-24 px-10 rounded"
            style={{
              backgroundImage: `url(${slides[currentSlide].imageUrl})`,
            }}
          >
            <footer className=" absolute inset-x-0 bottom-0 w-full p-6 bg-black bg-opacity-50">
            <div className="absolute bottom-0 left-0 p-3 pb-2">
              <h3 className="text-xl font-bold">{slides[currentSlide].title}</h3>
            </div>
            <div>
              <TwButton
                variation="primary"
                color="#157635"
                className="absolute p-1 bottom-2 right-0 w-55 right-2 "
                onClick={() => console.log("Button clicked")}
                
              >
                CHECK OUT
              </TwButton>
            </div>
            </footer>
          </div>
          <div className="flex justify-between w-10 mx-auto pb-3 pt-1">
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`${
              currentSlide === index ? "bg-green-600" : "bg-gray-400"
            } rounded-full w-3 pb-2`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>
      <hr className="h-px px-3 my-5 bg-gray-200 border-0 dark:bg-gray-700" />

        
      </div>
      
    </>
  );
};

export default Slider;
