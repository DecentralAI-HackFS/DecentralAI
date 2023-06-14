import Link from 'next/link';

export const Proposals = () => {
  return (
    <div className="pt-4">
      <div className="mx-auto flex w-[684px] flex-col items-start justify-start gap-4">
        <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-3 self-stretch">
          <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-4 self-stretch">
            <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-4 self-stretch rounded-lg">
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-center gap-1">
                <p className="shrink-0 grow-0 text-center text-xl text-[#1f2a37]">
                  Proposals
                </p>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 grow-0 items-start justify-between self-stretch">
            <div className="relative w-[288px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search"
              />
            </div>

            <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-2.5">
              <div className="relative flex shrink-0 grow-0 items-center justify-center gap-2 overflow-hidden rounded-lg bg-blue-600 px-3 py-2 hover:bg-blue-800">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative h-4 w-4 shrink-0 grow-0"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="M8 8H4H8Z" fill="white" />
                  <path
                    d="M8 4V8M8 8V12M8 8H12M8 8H4"
                    stroke="white"
                    stroke-width={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="shrink-0 grow-0 cursor-pointer text-left text-xs font-medium text-white">
                  Create Proposal
                </p>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 grow-0 items-start justify-between self-stretch">
            <div className="relative flex shrink-0 grow-0 items-center justify-start">
              <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                Filter:
              </p>
              <div className="flex shrink-0 grow-0 items-start justify-start">
                <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-1">
                  <div
                    className="relative flex shrink-0 grow-0 items-center justify-start gap-1 self-stretch overflow-hidden rounded-md px-2 py-[9px]"
                    style={{
                      filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.05))',
                    }}
                  >
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      All type
                    </p>
                    {/* <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative h-5 w-5 shrink-0 grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                        fill="#6B7280"
                      />
                    </svg> */}
                  </div>
                </div>
                {/* <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-1">
                  <div
                    className="relative flex shrink-0 grow-0 items-center justify-start gap-1 self-stretch overflow-hidden rounded-md px-2 py-[9px]"
                    style={{
                      filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.05))',
                    }}
                  >
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      All statuses
                    </p>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative h-5 w-5 shrink-0 grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                        fill="#6B7280"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-1">
                  <div
                    className="relative flex shrink-0 grow-0 items-center justify-start gap-1 self-stretch overflow-hidden rounded-md px-2 py-[9px]"
                    style={{
                      filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.05))',
                    }}
                  >
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      All results
                    </p>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative h-5 w-5 shrink-0 grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                        fill="#6B7280"
                      />
                    </svg>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <div className="relative flex shrink-0 grow-0 items-center justify-start">
              <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                Sort:
              </p>
              <div className="flex shrink-0 grow-0 items-start justify-start">
                <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-1">
                  <div
                    className="relative flex shrink-0 grow-0 items-center justify-start gap-1 self-stretch overflow-hidden rounded-md py-[9px] pl-2"
                    style={{
                      filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.05))',
                    }}
                  >
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      Newest first
                    </p>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative h-5 w-5 shrink-0 grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                        fill="#6B7280"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
          <div className="flex shrink-0 grow-0 cursor-pointer items-start justify-start self-stretch">
            <Link href="/decentral-ai/proposals/1">
              <div className="flex grow flex-col items-start justify-start gap-4 rounded-lg border border-gray-200 p-6 hover:shadow">
                <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2 self-stretch">
                  <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
                    <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
                      <p className="shrink-0 grow-0 text-left text-lg font-medium text-[#1f2a37]">
                        Add data: A Comprehensive Tutorial on Using FVM.txt
                      </p>
                    </div>
                  </div>
                  <p className="w-[636px] shrink-0 grow-0 self-stretch text-left text-sm text-gray-700">
                    Add new data to FVMLearn dataset.
                  </p>
                </div>
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <div className="relative flex shrink-0 grow-0 items-center justify-center gap-2 rounded-md">
                    <div className="relative flex shrink-0 grow-0 items-start justify-start gap-2.5 rounded-[100px] bg-[#31c48d] px-3 py-1">
                      <p className="shrink-0 grow-0 text-left text-xs text-white">
                        Active
                      </p>
                    </div>
                    <svg
                      width={3}
                      height={4}
                      viewBox="0 0 3 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <circle cx="1.5" cy={2} r="1.5" fill="#E5E7EB" />
                    </svg>
                    <p className="shrink-0 grow-0 text-left text-xs text-gray-500">
                      Ends in 7 days
                    </p>
                  </div>
                  <p className="shrink-0 grow-0 text-left text-xs">
                    <span className="shrink-0 grow-0 text-left text-xs text-gray-500">
                      Published by{' '}
                    </span>
                    <span className="shrink-0 grow-0 text-left text-xs text-[#1c64f2]">
                      0xF17...3973{' '}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex shrink-0 grow-0 cursor-pointer items-start justify-start self-stretch">
            <Link href="/decentral-ai/proposals/2">
              <div className="flex grow flex-col items-start justify-start gap-4 rounded-lg border border-gray-200 p-6 hover:shadow">
                <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2 self-stretch">
                  <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
                    <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
                      <p className="shrink-0 grow-0 text-left text-lg font-medium text-[#1f2a37]">
                        Fine tune chatbot: Vote responses for FVMCopilot
                      </p>
                    </div>
                  </div>
                  <p className="w-[636px] shrink-0 grow-0 self-stretch text-left text-sm text-gray-700">
                    Review the human guidance given to the FVMCopilot chatbot
                    and select the three most relevant responses for training
                    the AI.
                  </p>
                </div>
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <div className="relative flex w-[194px] shrink-0 grow-0 items-center justify-start gap-2 rounded-md">
                    <div className="relative flex shrink-0 grow-0 items-start justify-start gap-2.5 rounded-[100px] bg-[#31c48d] px-3 py-1">
                      <p className="shrink-0 grow-0 text-left text-xs text-white">
                        Active
                      </p>
                    </div>
                    <svg
                      width={3}
                      height={4}
                      viewBox="0 0 3 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <circle cx="1.5" cy={2} r="1.5" fill="#E5E7EB" />
                    </svg>
                    <p className="shrink-0 grow-0 text-left text-xs text-gray-500">
                      Ends in 7 days
                    </p>
                  </div>
                  <p className="shrink-0 grow-0 text-left text-xs">
                    <span className="shrink-0 grow-0 text-left text-xs text-gray-500">
                      Published by{' '}
                    </span>
                    <span className="shrink-0 grow-0 text-left text-xs text-[#1c64f2]">
                      0xF17...3973{' '}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex shrink-0 grow-0 cursor-pointer items-start justify-start self-stretch">
            <Link href="/decentral-ai/proposals/3">
              <div className="flex grow flex-col items-start justify-start gap-4 rounded-lg border border-gray-200 p-6 hover:shadow">
                <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2 self-stretch">
                  <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
                    <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
                      <p className="shrink-0 grow-0 text-left text-lg font-medium text-[#1f2a37]">
                        Fine tune chatbot: Collect responses for FVMCopilot
                      </p>
                    </div>
                  </div>
                  <p className="w-[636px] shrink-0 grow-0 self-stretch text-left text-sm text-gray-700">
                    Provide human guidance to the chatbot FVMCopilot on how to
                    address the 10 questions that have received substantial
                    negative feedback.
                  </p>
                </div>
                <div className="relative flex w-[642px] shrink-0 grow-0 items-center justify-between">
                  <div className="relative flex shrink-0 grow-0 items-center justify-center gap-2 rounded-md">
                    <div className="relative flex shrink-0 grow-0 items-start justify-start gap-2.5 rounded-[100px] bg-[#31c48d] px-3 py-1">
                      <p className="shrink-0 grow-0 text-left text-xs text-white">
                        Active
                      </p>
                    </div>
                    <svg
                      width={3}
                      height={4}
                      viewBox="0 0 3 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <circle cx="1.5" cy={2} r="1.5" fill="#E5E7EB" />
                    </svg>
                    <p className="shrink-0 grow-0 text-left text-xs text-gray-500">
                      Ends in 7 days
                    </p>
                  </div>
                  <p className="shrink-0 grow-0 text-left text-xs">
                    <span className="shrink-0 grow-0 text-left text-xs text-gray-500">
                      Published by{' '}
                    </span>
                    <span className="shrink-0 grow-0 text-left text-xs text-[#1c64f2]">
                      0xF17...3973{' '}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex shrink-0 grow-0 cursor-pointer items-start justify-start self-stretch">
            <Link href="/decentral-ai/proposals/4">
              <div className="flex grow flex-col items-start justify-start gap-4 rounded-lg border border-gray-200 p-6 hover:shadow">
                <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2 self-stretch">
                  <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
                    <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
                      <p className="shrink-0 grow-0 text-left text-lg font-medium text-[#1f2a37]">
                        Add data: FVM_Link.pdf
                      </p>
                    </div>
                  </div>
                  <p className="w-[636px] shrink-0 grow-0 self-stretch text-left text-sm text-gray-700">
                    Add new data to FVMResource dataset.
                  </p>
                </div>
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <div className="relative flex shrink-0 grow-0 items-center justify-center gap-2 rounded-md">
                    <div className="relative flex shrink-0 grow-0 items-start justify-start gap-2.5 rounded-[100px] bg-gray-500 px-3 py-1">
                      <p className="shrink-0 grow-0 text-left text-xs text-white">
                        Closed
                      </p>
                    </div>
                    <svg
                      width={3}
                      height={4}
                      viewBox="0 0 3 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <circle cx="1.5" cy={2} r="1.5" fill="#E5E7EB" />
                    </svg>
                    <p className="shrink-0 grow-0 text-left text-xs text-gray-500">
                      Ended 2 days ago
                    </p>
                  </div>
                  <p className="shrink-0 grow-0 text-left text-xs">
                    <span className="shrink-0 grow-0 text-left text-xs text-gray-500">
                      Published by{' '}
                    </span>
                    <span className="shrink-0 grow-0 text-left text-xs text-[#1c64f2]">
                      0xF17...3973{' '}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposals;
