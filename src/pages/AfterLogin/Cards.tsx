import { Card } from "flowbite-react";
import { TwButton } from "../../components/TwButton/TwButton";

type CardProps = {
  imgAlt?: string;
  imgSrc?: string;
  title: string;
  description: string;
  buttonLabel?: string;
  buttonColor?: string;
  buttonOnClick?: () => void;
};

export const TwCard = ({
  imgAlt,
  imgSrc,
  title,
  description,
  buttonLabel,
  buttonColor,
  buttonOnClick,
}: CardProps) => {
  return (
    <>

    <h2 className="text-2xl text-left px-3 pb-3 text-black">Restaurants</h2> 
    <div className=" px-3 flex justify-center items-center">
      <div className="max-w-sm w-full lg:w-1/2">
        <Card imgAlt={imgAlt} imgSrc={imgSrc}>
          <div className="flex flex-col">
            <div className="flex-grow">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {description}
              </p>
            </div>
            {buttonLabel && buttonOnClick && (
              <div className="flex justify-between ">
                <div className="flex-grow ">
                  <TwButton variation="primary" color={buttonColor} onClick={buttonOnClick}>
                    {buttonLabel}
                  </TwButton>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
    </>
  );
};

export default TwCard;
