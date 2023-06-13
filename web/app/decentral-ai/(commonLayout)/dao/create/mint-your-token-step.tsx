import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/20/solid";

import { StepType } from "./enum/step";
import { DaoFormData } from "./model/daoForm";
import { UseFormRegister } from "react-hook-form";

interface MintYourTokenStepProps {
  onChangeStep: (step: StepType) => void;
  register: UseFormRegister<DaoFormData>;
}

const MintYourTokenStep = ({
  onChangeStep,
  register,
}: MintYourTokenStepProps) => {
  return (
    <div>
      <div>
        <h4 className="text-2xl font-medium text-[#1f2a37]">Mint your token</h4>
        <p className="text-sm text-gray-400">
          Specify token details and allocate rewards to contributors.
        </p>
      </div>
      <div className="my-8 flex flex-col gap-6">
        <div>
          <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Token Name
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 px-2 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("tokenName")}
          />
        </div>
        <div>
          <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Token Symbol
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 px-2 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("tokenSymbol")}
          />
        </div>
        <div>
          <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Token Supply
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 px-2 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("tokenSupply")}
          />
        </div>
        <div>
          <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Initial Token Allocation
          </p>
          <div className="flex flex-col rounded-md border border-gray-100 px-6 py-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </div>
                <input
                  defaultValue="0x862c17d06192e113aA82dF34c170C58E297d4A23"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 px-2 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>
              <div className="w-[200px] shrink-0">
                <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Allocation
                </div>
                <div className="flex">
                  <input
                    defaultValue="100"
                    type="text"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 px-2 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>
              <div className="mt-[42px]">
                <MinusSmallIcon
                  className="h-5 w-5 cursor-default"
                  color="#1C64F2"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex flex-1 cursor-default items-center">
                <PlusSmallIcon className="h-5 w-5" color="#1C64F2" />
                <span className="text-xs text-[#1C64F2]">Wallet</span>
              </div>
              <div className="w-[220px] text-xs">100%</div>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Rewards Distribution
          </p>
          <div className="flex max-w-[443px] flex-col gap-y-1 rounded-md border border-gray-100 px-6 py-3">
            <div className="flex">
              <span className="flex-1 text-xs">Role</span>
              <span className="w-[200px] pl-2 text-xs">Allocation</span>
            </div>
            <div className="flex items-center">
              <span className="flex-1 text-sm">Funder</span>
              <div className="w-[200px]">
                <div className="flex">
                  <input
                    defaultValue={30}
                    type="text"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <span className="flex-1 text-sm">Data Contributor</span>
              <div className="w-[200px]">
                <div className="flex">
                  <input
                    defaultValue={20}
                    type="text"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="flex-1 text-sm">Data Wizard</span>
              <div className="w-[200px]">
                <div className="flex">
                  <input
                    defaultValue={20}
                    type="text"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="flex-1 text-sm">Storage Provider</span>
              <div className="w-[200px]">
                <div className="flex">
                  <input
                    defaultValue={30}
                    type="text"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <button
          type="button"
          className="rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          onClick={() => {
            onChangeStep(StepType.CREATE_NEW_DAO);
          }}
        >
          Back
        </button>
        <button
          type="button"
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            onChangeStep(StepType.REVIEW);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MintYourTokenStep;
