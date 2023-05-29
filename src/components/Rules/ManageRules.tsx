import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Select from '../Select/Select';
import { InputWithIcon } from '../InputWithIcon/InputWithIcon';
import api from '../../helpers/api/api.factory';
import { useMutation } from 'react-query';
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from '../../helpers/ToastHelper';
import axios from 'axios';
import { TwButton } from '../TwButton/TwButton';

const ManageRules = () => {
  enum RuleTypes {
    QUIET_TIMES = 'QUIET_TIMES',
    GROUP_SPECIALS = 'GROUP_SPECIALS',
    HAPPY_HOURS = 'HAPPY_HOURS',
    DAY_OF_WEEK = 'DAY_OF_WEEK',
  }

  const navigate = useNavigate();
  const [ruleType, setRuleType] = useState<String>(RuleTypes.QUIET_TIMES);
  const [dayOfWeek, setDayOfWeek] = useState<String>('MONDAY');
  const [menuType, setMenuType] = useState<String>('BEVERAGE');
  const [discount, setDiscount] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const selectRule = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRuleType(value);
  };
  const selectDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setDayOfWeek(value);
  };
  const selectMenuType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setMenuType(value);
  };

  const options = [
    { value: RuleTypes.QUIET_TIMES, label: 'QUIET TIMES' },
    { value: RuleTypes.GROUP_SPECIALS, label: 'GROUP SPECIALS' },
    { value: RuleTypes.HAPPY_HOURS, label: 'HAPPY HOURS' },
    { value: RuleTypes.DAY_OF_WEEK, label: 'DAY OF WEEK' },
  ];

  const dayOptions = [
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNESDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
    { value: 'SATURDAY', label: 'Saturday' },
    { value: 'SUNDAY', label: 'Sunday' },
  ];

  const menuTypeOptions = [
    { value: 'BEVERAGE', label: 'BEVERAGE' },
    { value: 'SAVORY', label: 'SAVORY' },
    { value: 'DESSERT', label: 'DESSERT' },
    { value: 'ALL', label: 'ALL' },
  ];
  const params = useParams();

  const { mutate } = useMutation(
    () =>
      api.fetch<any>('set_rules', {
        id: params.id,
        ruleType,
        dayOfWeek,
        discount,
        discountOn: menuType,
        startTime,
        endTime,
      }),

    {
      onSuccess: (res: any) => {
        ToastHelper.showToast(
          'Rule has been added successfully',
          ToastType.SUCCESS,
          ToastMessageType.CUSTOM
        );
        navigate('/rules');
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          ToastHelper.showToast(
            error.message,
            ToastType.ERROR,
            ToastMessageType.CUSTOM
          );
        }
      },
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  const re = /^[0-9\b]+$/;

  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || re.test(e.target.value)) {
      setDiscount(e.target.value);
    }
  };

  const handleGroupSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || re.test(e.target.value)) {
      setGroupSize(e.target.value);
    }
  };

  return (
    <div>
      <div className="mt-8 mx-4">
        <h1 className="font-medium text-2xl">Manage Rules</h1>

        <form
          className="my-4 flex flex-col gap-4 max-w-[500px] w-full"
          onSubmit={handleSubmit}
        >
          <Select options={options} onChange={selectRule} />
          <Select options={menuTypeOptions} onChange={selectMenuType} />
          {(ruleType === RuleTypes.DAY_OF_WEEK ||
            ruleType === RuleTypes.HAPPY_HOURS) && (
            <Select options={dayOptions} onChange={selectDay} />
          )}

          <InputWithIcon
            type="text"
            name="discount"
            placeholder="Discount"
            className="block w-full p-4 "
            required
            value={discount}
            onChange={(e) => handleDiscount(e)}
            inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            inputErrorClasses="border-red-500"
            inputSuccessClasses="border-green-500"
            labelBaseClasses="text-gray-900"
            labelErrorClasses="text-red-500"
            labelSuccessClasses="text-green-500"
            inputSizing="py-4 px-4"
          />
          {ruleType === RuleTypes.GROUP_SPECIALS && (
            <InputWithIcon
              type="text"
              name="groupsize"
              placeholder="Group size"
              className="block w-full p-4 "
              required
              value={groupSize}
              onChange={(e) => handleGroupSize(e)}
              inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              inputErrorClasses="border-red-500"
              inputSuccessClasses="border-green-500"
              labelBaseClasses="text-gray-900"
              labelErrorClasses="text-red-500"
              labelSuccessClasses="text-green-500"
              inputSizing="py-4 px-4"
            />
          )}

          {ruleType === RuleTypes.HAPPY_HOURS && (
            <>
              <span className="font-medium ">From</span>
              <InputWithIcon
                name="openTime"
                placeholder="Work days from"
                className="block w-full p-4 "
                required
                value={startTime}
                type="time"
                id="openTime"
                inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setStartTime(event.target.value);
                }}
              />
            </>
          )}

          {ruleType === RuleTypes.HAPPY_HOURS && (
            <>
              <span className="font-medium">To</span>
              <InputWithIcon
                name="closeTime"
                placeholder="Work days from"
                className="block w-full p-4 "
                required
                value={endTime}
                type="time"
                id="closeTime"
                inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEndTime(event.target.value);
                }}
              />
            </>
          )}

          <TwButton
            className="mt-3 md:w-40 md:h-12"
            variation="primary"
            color="#046C4E"
            type="submit"
          >
            Save rule
          </TwButton>
        </form>
      </div>
    </div>
  );
};

export default ManageRules;
