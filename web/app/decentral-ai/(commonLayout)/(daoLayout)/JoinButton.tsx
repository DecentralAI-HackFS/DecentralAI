import { useWorkspacesContext } from "@/context/workspace-context";
import { joinDaoApp } from "@/service/dao";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Fragment, useState } from "react";
import Toast from "../../components/base/toast";
import { useTranslation } from "react-i18next";
import { useSWRConfig } from "swr";
import ExploreContext from "@/context/explore-context";
import { useContext } from "use-context-selector";

import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import { useSelectedLayoutSegments } from "next/navigation";

const mailingLists = [
  {
    id: 1,
    title: "Data Contributor",
    description: "Add data to DAO.",
  },
  {
    id: 2,
    title: "Data Wizard",
    description: "Process and clean the data.",
  },
  {
    id: 3,
    title: "Storage Provider",
    description: "Store DAO data.",
  },
  {
    id: 4,
    title: "Instructor",
    description: "Help fine-tune the chatbot with human instruction.",
  },
  {
    id: 5,
    title: "Server Host",
    description: "Host the application.",
  },
];

const JoinButton = () => {
  const segments = useSelectedLayoutSegments();
  const id = segments?.[segments.length - 1];
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedMailingLists, setSelectedMailingLists] = useState(
    mailingLists[0]
  );
  const { mutate } = useSWRConfig();
  const { workspaces } = useWorkspacesContext();
  const currentWorkspace = workspaces.filter((item) => item.current)?.[0];
  const { setControlUpdateInstalledApps } = useContext(ExploreContext);
  const { address, isConnecting, isDisconnected } = useAccount();
  if (!address) {
    return <></>;
  }
  const { config } = usePrepareContractWrite({
    address: "0x9604c01A49d922948E165cdFc6c52D5705c7fD20",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "safeMint",
    args: [address!],
  });
  const { writeAsync } = useContractWrite(config);

  const handleAddToWorkspace = async () => {
    await writeAsync!();
    await joinDaoApp({ daoId: id, role: "admin" });

    Toast.notify({
      type: "success",
      message: t("common.api.success"),
    });
    mutate({ url: "/workspaces" });
    setControlUpdateInstalledApps(Date.now());
  };

  return (
    <>
      <button
        type="button"
        className="rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          setOpen(true);
        }}
      >
        Join
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="flex justify-between items-start">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Join {currentWorkspace?.name} DAO
                      </Dialog.Title>
                      <XMarkIcon
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </div>

                    <div className="mt-6">
                      <p className="text-sm text-gray-500">
                        How would you like to contribute?
                      </p>
                      <div>
                        <RadioGroup
                          value={selectedMailingLists}
                          onChange={setSelectedMailingLists}
                        >
                          <div className="mt-4 flex flex-col gap-3">
                            {mailingLists.map((mailingList) => (
                              <RadioGroup.Option
                                key={mailingList.id}
                                value={mailingList}
                                className={({ checked, active }) =>
                                  classNames(
                                    checked
                                      ? "border-transparent"
                                      : "border-gray-300",
                                    active
                                      ? "border-indigo-600 ring-2 ring-indigo-600"
                                      : "",
                                    "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none items-center"
                                  )
                                }
                              >
                                {({ checked, active }) => (
                                  <>
                                    <span className="flex flex-1">
                                      <span className="flex flex-col">
                                        <RadioGroup.Label
                                          as="span"
                                          className="block text-sm font-medium text-gray-900"
                                        >
                                          {mailingList.title}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                          as="span"
                                          className="mt-1 flex items-center text-sm text-gray-500"
                                        >
                                          {mailingList.description}
                                        </RadioGroup.Description>
                                      </span>
                                    </span>
                                    <span
                                      className={classNames(
                                        checked
                                          ? "bg-indigo-600 border-transparent"
                                          : "bg-white border-gray-300",
                                        "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                                      )}
                                      aria-hidden="true"
                                    >
                                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                                    </span>
                                    {/* <div
                                      className={classNames(
                                        !checked ? "invisible" : "",
                                        "h-5 w-5 bg-indigo-600 rounded-full"
                                      )}
                                    /> */}
                                    {/* <CheckCircleIcon
                                      className={classNames(
                                        !checked ? "invisible" : "",
                                        "h-5 w-5 text-indigo-600"
                                      )}
                                      aria-hidden="true"
                                    /> */}
                                    <span
                                      className={classNames(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-indigo-600"
                                          : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-lg"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      disabled={!writeAsync}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => {
                        setOpen(false);
                        handleAddToWorkspace();
                      }}
                    >
                      Mint & Join
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default JoinButton;
