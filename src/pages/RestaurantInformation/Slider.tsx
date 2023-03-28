import { Carousel } from 'flowbite-react';

interface IRestaurantImages {
  images: string[];
}

const Slider = ({ images }: IRestaurantImages) => {
  const restaurantImages = images.map((restaurantImage) => (
    <img src={restaurantImage} alt="..." className="object-cover h-full " />
  ));
  return (
    <Carousel slide={false} className="" rightControl={true}>
      {restaurantImages}
    </Carousel>
  );
};

export default Slider;
