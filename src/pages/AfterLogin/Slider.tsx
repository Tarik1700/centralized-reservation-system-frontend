import React, { useState} from "react";
import { TwButton } from "../../components/TwButton/TwButton";

interface Slide {
  imageUrl: string;
  title: string;
  buttonText?: string;
}

interface Props {
  slides: Slide[];
}

const Slider: React.FC<Props> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (newIndex: number) => {
    setCurrentSlide(newIndex);
  };

 

  return (
    <>
    <h3 className="text-2xl text-left px-3 text-black pb-3 pt-3">Popular</h3>
      <div className=" relative px-3   ">
        <div  className="relative">
          <div
            className="bg-cover bg-center   h-auto text-white py-24 px-10 "
            style={{
              backgroundImage: `url(${slides[currentSlide].imageUrl})`,
            }}
          >
            <div className="absolute bottom-0 left-0 p-3 pb-6">
              <h3 className="text-xl font-bold">{slides[currentSlide].title}</h3>
            </div>
            <div >
              <TwButton variation="primary" color="#157635"  className="absolute p-1 bottom-7 right-0 w-55 ">{slides[currentSlide].buttonText}</TwButton>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div className="flex justify-between w-12 mx-auto pb-2">
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`${
              currentSlide === index ? "bg-green-600" : "bg-gray-400"
            } rounded-full w-4 pb-2`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
        
      </div>
      
     
    </>

  );
};

export default Slider;
