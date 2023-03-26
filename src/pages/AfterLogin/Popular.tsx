import { Carousel } from "flowbite-react";
import { TwButton } from "../../components/TwButton/TwButton";


const ImageSlider = () => {
  return (
    <>
<h3 className="text-2xl text-left px-3 text-black pb-3 pt-3">Popular</h3>
    <div className="relative px-3">
      
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
        <div className="rounded-full absolute bottom-0 right-0 mb-4 mr-4 ">
          <TwButton variation="primary" color="#157635">Button</TwButton>
        </div>
        <div className="absolute bottom-0 left-0 mb-4 ml-4">
        <p className="text-white ">Image Label</p>
        </div>
      </div>
    </div>
    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

    </>
  );
};

export default ImageSlider;