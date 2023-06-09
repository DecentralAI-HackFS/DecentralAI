import { PencilIcon } from '@heroicons/react/24/outline';

import { StepType } from './enum/step';

interface ReviewStepProps {
  onChangeStep: (step: StepType) => void;
}

const DAODetailsData = [
  { title: 'DAO Name', value: 'FVMLearnDAO' },
  { title: 'Logo', value: 'None' },
  {
    title: 'Short Description',
    value:
      'A Decentralized Autonomous Organization for FileCoin Virtual Machine Education.',
  },
  {
    title: 'About this DAO',
    value:
      'FVMLearnDAO is a community-driven DAO that aims to revolutionize education on the FileCoin Virtual Machine (FVM). We collect tutorials, training materials, and resources created by DAO members, utilizing them to fine-tune a ChatGPT-based AI tool. This AI tool will serve as an interactive and personalized educational companion, guiding individuals on how to effectively develop on the FileCoin Virtual Machine. ',
  },
  { title: 'Sample Data', value: 'A Comprehensive Tutorial on Using FVM.txt' },
];

const TokenDetailsData = [
  {
    title: 'Token Name',
    value: (
      <div className="flex items-center gap-4">
        <p>FVML</p>
        <div className="flex items-center justify-center rounded-md bg-[#e1effe] px-2.5">
          <p className="text-xs font-medium text-[#1c64f2]">Not changeable</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Token Symbol',
    value: (
      <div className="flex items-center gap-4">
        <p>FVML</p>
        <div className="flex items-center justify-center rounded-md bg-[#e1effe] px-2.5">
          <p className="text-xs font-medium text-[#1c64f2]">Not changeable</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Token Supply',
    value: (
      <div className="flex items-center gap-4">
        <p>100,000</p>
        <div className="flex items-center justify-center rounded-md bg-[#e1effe] px-2.5">
          <p className="text-xs font-medium text-[#1c64f2]">Not changeable</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Initial Token Allocation',
    value: '00xd00...e273 (50%),  00qg7n...5yvp  (50%)',
  },
  {
    title: 'Rewards Distribution',
    value:
      'Funder (30%), Data Contributor (20%), Data Wizard (20%), Storage Provider (30%)',
  },
];

const ReviewStep = ({ onChangeStep }: ReviewStepProps) => {
  return (
    <div>
      <div>
        <h4 className="text-2xl font-medium text-[#1f2a37]">Review</h4>
        <p className="text-sm text-gray-400">
          Double-check that everything is correct before launching your
          organization.
        </p>
      </div>
      <div className="my-8 flex flex-col gap-10">
        <div>
          <div className="mb-2 flex justify-between text-sm font-medium text-gray-900 dark:text-white">
            <p>DAO Details</p>
            <PencilIcon
              className="h-4 w-4 cursor-pointer"
              color="#1C64F2"
              onClick={() => {
                onChangeStep(StepType.CREATE_NEW_DAO);
              }}
            />
          </div>
          <div className="gap-y-1 rounded-md border border-gray-200 px-6 py-4 text-sm text-gray-700">
            {DAODetailsData.map((item) => (
              <div key={item.title} className="flex py-2">
                <div className="w-[192px]">{item.title}</div>
                <div className="flex-1 leading-7">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between text-sm font-medium text-gray-900 dark:text-white">
            <p>Token Details</p>
            <PencilIcon
              className="h-4 w-4 cursor-pointer"
              color="#1C64F2"
              onClick={() => {
                onChangeStep(StepType.MINT_YOUR_TOKEN);
              }}
            />
          </div>
          <div className="gap-y-1 rounded-md border border-gray-200 px-6 py-4 text-sm text-gray-700">
            {TokenDetailsData.map((item) => (
              <div key={item.title} className="flex py-2">
                <div className="w-[192px]">{item.title}</div>
                <div className="flex-1 leading-7">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <button
          type="button"
          className="rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          onClick={() => {
            onChangeStep(StepType.MINT_YOUR_TOKEN);
          }}
        >
          Back
        </button>
        <button
          type="button"
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Deploy DAO
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
