import React from 'react';
import { useState } from 'react';
import ModalGeneric from '../components/ModalGeneric/ModalGeneric';
import { TwButton } from '../components/TwButton/TwButton';
import 'react-toastify/dist/ReactToastify.css';
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from '../helpers/ToastHelper';
import api from '../helpers/api/api.factory';
import { useMutation, useQuery } from 'react-query';
import { InputWithIcon } from '../components/InputWithIcon/InputWithIcon';

const TutorialPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  //Example of get req
  // const test2  = useMutation([''], () => api.fetch("post_example"));
  const test = useQuery(['get_example'], () => api.fetch('get_example'), {
    onSuccess: () => {
      ToastHelper.showToast(
        'Reservation',
        ToastType.SUCCESS,
        ToastMessageType.CREATE
      );
    },
    onError: () => {
      ToastHelper.showToast(
        'Reservation',
        ToastType.ERROR,
        ToastMessageType.ERROR
      );
    },
  });

  //Example of manual notification calling for success
  const notificationSuccess = () => {
    ToastHelper.showToast(
      'Reservation',
      ToastType.SUCCESS,
      ToastMessageType.CREATE
    );
  };

  //Example of manual notification calling for Error, we will usually use them as above in the onSuccess or onError
  const notificationError = () => {
    ToastHelper.showToast(
      'Reservation',
      ToastType.ERROR,
      ToastMessageType.ERROR
    );
  };

  return (
    <div>
      {/* Example of reusable generic modal and button use */}
      <div className="w-36">
        <ModalGeneric
          size="sm"
          isOpen={isOpen}
          setOpen={setIsOpen}
          buttonToOpenModal={
            <TwButton
              variation="primary"
              color="black"
              onClick={() => setIsOpen(true)}
            >
              Open modal
            </TwButton>
          }
          header=" Lorem ipsum dolor"
          footer={
            <div className="flex gap-5">
              <div className="w-[71px]">
                <TwButton
                  className="text-sm font-medium py-2 px-3 border border-solid border-[#E5E7EB]"
                  variation="base"
                  onClick={() => notificationSuccess()}
                >
                  notification
                </TwButton>
              </div>
              <div className="w-[87px]">
                <TwButton
                  className="text-sm font-medium py-2 px-3"
                  variation="primary"
                  color="#046C4E"
                  onClick={() => setIsOpen(false)}
                >
                  Continue
                </TwButton>
              </div>
            </div>
          }
        >
          <p className="text-base font-normal text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut molestie
            purus arcu, quis dignissim justo malesuada non. Ut non mauris
            vehicula, laoreet tortor at, tristique turpis. Etiam la
          </p>
        </ModalGeneric>
        <InputWithIcon
          id="exampleInputName"
          name="exampleInput_name"
          type="text"
          value={inputText}
          placeholder="Test me out!"
          inputSizing="py-[18px]"
          labelBaseClasses=" text-gray-500"
          labelErrorClasses="bg-[#49AE89] text-red-600"
          labelSuccessClasses="bg-[#49AE89] text-green-600"
          inputBaseClasses="text-gray-900 border-gray-300 focus:border-gray-300"
          inputErrorClasses="text-gray-900 border-red-600 focus:border-red-600"
          inputSuccessClasses="text-gray-900 border-green-600 focus:border-green-600 disabled:border-gray-300 disabled:text-gray-400"
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TutorialPage;
