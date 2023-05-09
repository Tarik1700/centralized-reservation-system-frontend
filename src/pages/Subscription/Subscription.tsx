import { useNavigate } from 'react-router-dom';
import tick from '../../assets/images/tick.svg';

const Subscription = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-8">
        <h2 className="font-medium text-2xl ">Subscription</h2>
        <p className="text-sm mt-2 text-[#9D9D9D]">
          To register your restaurants, please complete the payment process.
        </p>

        <div className="bg-white mt-8 rounded-lg sm:max-w-[500px] sm:mr-4 ">
          <div className="pt-7 pl-3 flex items-center h-[50px] relative">
            <span className="absolute top-5 font-normal text-lg text-[#9D9D9D]">
              $
            </span>
            <span className="text-3xl font-semibold left-2px ml-4 pr-1">
              150
            </span>
            <span className="font-normal text-lg text-[#9D9D9D]">/month</span>
          </div>
          <div className="mt-4 ml-5">
            <h3 className="flex mb-2">
              <img src={tick} alt="" className="mr-2 " /> Up to 3 restaurants
            </h3>
            <h3 className="flex mb-2">
              <img src={tick} alt="" className="mr-2 " /> Unlimited support
            </h3>
            <h3 className="flex pb-6">
              <img src={tick} alt="" className="mr-2 " /> 5 staff members per
              restaurant
            </h3>
          </div>
        </div>

        <button
          className="mt-9 bg-[#157635] w-full sm:w-80 rounded-lg text-white h-12 text-lg hover:cursor-pointer"
          onClick={() => navigate('/subscription/payment')}
        >
          Proceed to payment
        </button>
      </div>
    </div>
  );
};

export default Subscription;
