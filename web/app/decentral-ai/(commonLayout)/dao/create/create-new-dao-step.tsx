import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { StepType } from "./enum/step";
import { DaoFormData } from "./model/daoForm";
import { useState } from "react";

interface CreateNewDaoStepProps {
  onChangeStep: (step: StepType) => void;
  register: UseFormRegister<DaoFormData>;
}

const CreateNewDaoStep = ({
  onChangeStep,
  register,
}: CreateNewDaoStepProps) => {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div>
      <div>
        <h4 className="text-2xl font-medium text-[#1f2a37]">Create new DAO</h4>
        <p className="text-sm text-gray-400">
          Select the perfect DAO type for your vision and goals.
        </p>
      </div>
      <div className="my-8 flex flex-col gap-6">
        <div>
          <div className="mb-2 block font-medium text-gray-900 dark:text-white">
            DAO Name
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 px-2 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("daoName")}
          />
        </div>
        <div>
          <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Logo
          </p>
          <div>
            {selectedImage && (
              <div>
                <img
                  className="rounded-lg"
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <button onClick={() => setSelectedImage(null)}>Remove</button>
              </div>
            )}
            {!selectedImage && (
              <label htmlFor="logo">
                <div className="inline-block w-fit cursor-pointer rounded hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <svg
                    width={48}
                    height={48}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative h-12 w-12 shrink-0 grow-0"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M28 8H12C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12V32M8 32V36C8 37.0609 8.42143 38.0783 9.17157 38.8284C9.92172 39.5786 10.9391 40 12 40H36C37.0609 40 38.0783 39.5786 38.8284 38.8284C39.5786 38.0783 40 37.0609 40 36V28M8 32L17.172 22.828C17.9221 22.0781 18.9393 21.6569 20 21.6569C21.0607 21.6569 22.0779 22.0781 22.828 22.828L28 28M40 20V28M40 28L36.828 24.828C36.0779 24.0781 35.0607 23.6569 34 23.6569C32.9393 23.6569 31.9221 24.0781 31.172 24.828L28 28M28 28L32 32M36 8H44M40 4V12M28 16H28.02"
                      stroke="#D1D5DB"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    id="logo"
                    type="file"
                    className="hidden"
                    {...register("daoLogo")}
                    onChange={(event: any) => {
                      register("daoLogo").onChange(event);
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                </div>
              </label>
            )}
          </div>
        </div>
        <div>
          <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Short Description
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 px-2 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("daoDescription")}
          />
        </div>
        <div>
          <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            About this DAO
          </div>
          <textarea
            rows={4}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Write your thoughts here..."
            {...register("daoAbout")}
          />
        </div>
        <div>
          <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Sample Data
          </div>
          <input
            className="block w-full cursor-pointer rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
            type="file"
            {...register("daoSampleData")}
          />
        </div>
      </div>

      <div className="flex w-full justify-between">
        <button
          type="button"
          className="ml-auto rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            onChangeStep(StepType.MINT_YOUR_TOKEN);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateNewDaoStep;
