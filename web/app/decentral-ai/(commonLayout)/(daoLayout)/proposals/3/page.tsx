import Link from 'next/link';

const Proposals1 = () => {
  return (
    <div className="mt-4 flex justify-center gap-[120px] pb-20">
      <div>
        <div className="flex w-[564px] flex-col items-start justify-start gap-2">
          <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
            <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
              <div className="flex w-[205px] shrink-0 grow-0 items-start justify-start gap-4">
                <div className="flex w-[238px] shrink-0 grow-0 flex-col items-start justify-start gap-4 rounded-lg">
                  <Link href="/decentral-ai/proposals">
                    <div className="relative flex shrink-0 grow-0 cursor-pointer items-center justify-start gap-1">
                      <svg
                        width={16}
                        height={17}
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative h-4 w-4 shrink-0 grow-0"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          d="M9.99992 13.1668L5.33325 8.50016L9.99992 3.8335"
                          stroke="#374151"
                          stroke-width={2}
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p className="shrink-0 grow-0 text-center text-sm text-[#1f2a37]">
                        Back
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-4">
                <p className="shrink-0 grow-0 text-center text-xl font-medium text-[#1f2a37]">
                  Fine tune chatbot: Collect responses for FVMCopilot
                </p>
                <div className="relative flex shrink-0 grow-0 items-center justify-start gap-2">
                  <div className="relative flex shrink-0 grow-0 items-start justify-start gap-2.5 rounded-[100px] bg-[#31c48d] px-3 py-1">
                    <p className="shrink-0 grow-0 text-left text-sm text-white">
                      Active
                    </p>
                  </div>
                  <svg
                    width={3}
                    height={3}
                    viewBox="0 0 3 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 grow-0"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <circle cx="1.5" cy="1.5" r="1.5" fill="#E5E7EB" />
                  </svg>
                  <p className="shrink-0 grow-0 text-left text-sm text-gray-500">
                    Ends in 7 days
                  </p>
                  <svg
                    width={3}
                    height={3}
                    viewBox="0 0 3 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 grow-0"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <circle cx="1.5" cy="1.5" r="1.5" fill="#E5E7EB" />
                  </svg>
                  <p className="shrink-0 grow-0 text-left text-sm">
                    <span className="shrink-0 grow-0 text-left text-sm text-gray-500">
                      Published by
                    </span>
                    <span className="shrink-0 grow-0 text-left text-sm text-black">
                      {' '}
                    </span>
                    <span className="shrink-0 grow-0 text-left text-sm text-[#1c64f2]">
                      0xF17...3973{' '}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-6">
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2 self-stretch">
                <p className="shrink-0 grow-0 text-left text-base font-medium text-gray-700">
                  Abstract
                </p>
                <p className="w-[557px] shrink-0 grow-0 self-stretch text-left text-sm text-gray-700">
                  Provide human guidance to the chatbot FVMCopilot on how to
                  address the 3 questions that have received substantial
                  negative feedback.
                </p>
              </div>
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
                <p className="shrink-0 grow-0 text-left text-base font-medium text-gray-700">
                  Proposal
                </p>
                <p className="w-[557px] shrink-0 grow-0 text-left text-sm text-gray-700">
                  <span className="w-[557px] shrink-0 grow-0 text-left text-sm text-gray-700">
                    The chatbot FVMCopilot has recently received multiple
                    negative feedback. To aid in refining the chatbot, kindly
                    share your insights on what the ideal answers for the three
                    questions should be. The period for collecting answer
                    suggestions will commence from June 9th until June 16th.
                    Feel free to make as many modifications as you desire to the
                    answers before the end date.
                  </span>
                  <br />
                  <br />
                  <span className="w-[557px] shrink-0 grow-0 text-left text-sm text-gray-700">
                    Following the collection period, a voting session will be
                    initiated. Each wallet will hold one vote. The top 3 answers
                    will be utilized to train the AI.
                  </span>
                </p>
              </div>
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
                <p className="shrink-0 grow-0 text-left text-base font-medium text-gray-700">
                  Reply as User
                </p>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-4">
            <div className="flex w-[564px] shrink-0 grow-0 flex-col items-start justify-start gap-4 rounded-lg border-[0.8px] border-gray-200 p-4">
              <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-2 self-stretch">
                <div className="flex shrink-0 grow-0 items-start justify-start gap-2.5 self-stretch">
                  <div className="flex grow items-start justify-start gap-8">
                    <div className="relative flex w-[86px] shrink-0 grow-0 items-start justify-end gap-2.5 py-1">
                      <p className="shrink-0 grow-0 text-right text-sm font-medium text-[#1f2a37]">
                        Question
                      </p>
                    </div>
                    <div className="relative flex grow flex-col items-start justify-start gap-2.5 rounded-lg py-1">
                      <p className="w-[414px] shrink-0 grow-0 self-stretch text-left text-sm text-[#1f2a37]">
                        How can I get started with the FileCoin Virtual Machine?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 grow-0 items-start justify-start gap-2.5 self-stretch">
                  <div className="flex grow items-start justify-start gap-8">
                    <div className="relative flex w-[86px] shrink-0 grow-0 items-start justify-end gap-2.5 py-1">
                      <p className="shrink-0 grow-0 text-right text-sm font-medium text-[#1f2a37]">
                        Response
                      </p>
                    </div>
                    <div className="relative flex grow flex-col items-start justify-start gap-2.5 rounded-lg py-1">
                      <p className="w-[414px] shrink-0 grow-0 self-stretch text-left text-sm text-[#1f2a37]">
                        To get started with the FileCoin Virtual Machine (FVM),
                        you can refer to the official documentation and
                        tutorials provided by the FileCoin project.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 grow-0 items-start justify-start gap-2.5 self-stretch">
                  <div className="relative flex grow items-center justify-start gap-8">
                    <p className="w-[85px] shrink-0 grow-0 text-right text-sm font-medium text-[#1f2a37]">
                      Your Answer
                    </p>
                    <input
                      type="text"
                      className="block w-full rounded-lg border-none border-gray-300 bg-gray-50 px-2.5 py-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter the expected answer that you want the AI to reply"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[564px] shrink-0 grow-0 flex-col items-start justify-start gap-6 rounded-lg border-[0.8px] border-gray-200 p-4">
              <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-2 self-stretch">
                <div className="flex shrink-0 grow-0 items-start justify-start gap-2.5 self-stretch">
                  <div className="flex grow items-start justify-start gap-8">
                    <div className="relative flex w-[86px] shrink-0 grow-0 items-start justify-end gap-2.5 py-1">
                      <p className="shrink-0 grow-0 text-right text-sm font-medium text-[#1f2a37]">
                        Question
                      </p>
                    </div>
                    <div className="relative flex grow flex-col items-start justify-start gap-2.5 rounded-lg py-1">
                      <p className="w-[414px] shrink-0 grow-0 self-stretch text-left text-sm text-[#1f2a37]">
                        What are the key features and capabilities of the
                        FileCoin Virtual Machine?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 grow-0 items-start justify-start gap-2.5 self-stretch">
                  <div className="flex grow items-start justify-start gap-8">
                    <div className="relative flex w-[86px] shrink-0 grow-0 items-start justify-end gap-2.5 py-1">
                      <p className="shrink-0 grow-0 text-right text-sm font-medium text-[#1f2a37]">
                        Response
                      </p>
                    </div>
                    <div className="relative flex grow flex-col items-start justify-start gap-2.5 rounded-lg py-1">
                      <p className="w-[414px] shrink-0 grow-0 self-stretch text-left text-sm text-[#1f2a37]">
                        The key features and capabilities of the FileCoin
                        Virtual Machine include executing smart contracts,
                        facilitating decentralized storage and retrieval of
                        data, and enabling interoperability with the FileCoin
                        network.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 grow-0 items-start justify-start gap-2.5 self-stretch">
                  <div className="relative flex grow items-center justify-start gap-8">
                    <p className="w-[85px] shrink-0 grow-0 text-right text-sm font-medium text-[#1f2a37]">
                      Your Answer
                    </p>
                    <input
                      type="text"
                      className="block w-full rounded-lg border-none border-gray-300 bg-gray-50 px-2.5 py-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter the expected answer that you want the AI to reply"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[564px] shrink-0 grow-0 flex-col items-start justify-start gap-6 rounded-lg border-[0.8px] border-gray-200 p-4">
              <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-2 self-stretch">
                <div className="flex shrink-0 grow-0 items-start justify-start gap-2.5 self-stretch">
                  <div className="flex grow items-start justify-start gap-8">
                    <div className="relative flex w-[86px] shrink-0 grow-0 items-start justify-end gap-2.5 py-1">
                      <p className="shrink-0 grow-0 text-right text-sm font-medium text-[#1f2a37]">
                        Question
                      </p>
                    </div>
                    <div className="relative flex grow flex-col items-start justify-start gap-2.5 rounded-lg py-1">
                      <p className="w-[414px] shrink-0 grow-0 self-stretch text-left text-sm text-[#1f2a37]">
                        Can you provide step-by-step instructions for deploying
                        smart contracts on the FileCoin Virtual Machine?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 grow-0 items-start justify-start gap-2.5 self-stretch">
                  <div className="flex grow items-start justify-start gap-8">
                    <div className="relative flex w-[86px] shrink-0 grow-0 items-start justify-end gap-2.5 py-1">
                      <p className="shrink-0 grow-0 text-right text-sm font-medium text-[#1f2a37]">
                        Response
                      </p>
                    </div>
                    <div className="relative flex grow flex-col items-start justify-start gap-2.5 rounded-lg py-1">
                      <p className="w-[414px] shrink-0 grow-0 self-stretch text-left text-sm text-[#1f2a37]">
                        Step-by-step instructions for deploying smart contracts
                        on the FileCoin Virtual Machine can be found in the
                        FileCoin developer documentation, which provides
                        detailed guidance and examples.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 grow-0 items-start justify-start gap-2.5 self-stretch">
                  <div className="relative flex grow items-center justify-start gap-8">
                    <p className="w-[85px] shrink-0 grow-0 text-right text-sm font-medium text-[#1f2a37]">
                      Your Answer
                    </p>
                    <input
                      type="text"
                      className="block w-full rounded-lg border-none border-gray-300 bg-gray-50 px-2.5 py-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter the expected answer that you want the AI to reply"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[120px]">
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="flex w-[326px] shrink-0 grow-0 flex-col items-start justify-start gap-2.5 rounded-lg border-[0.8px] border-gray-200 p-6">
            <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-4 self-stretch">
              <p className="shrink-0 grow-0 text-left text-base font-medium text-[#1f2a37]">
                Overview
              </p>
              <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-[13px] self-stretch">
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <p className="shrink-0 grow-0 text-left text-sm font-medium text-gray-700">
                    Proposal type
                  </p>
                  <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                    App
                  </p>
                </div>
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <p className="shrink-0 grow-0 text-left text-sm font-medium text-gray-700">
                    Voting strategy
                  </p>
                  <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                    Wallet-based
                  </p>
                </div>
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <p className="shrink-0 grow-0 text-left text-sm font-medium text-gray-700">
                    Voting option
                  </p>
                  <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                    Human Instruction
                  </p>
                </div>
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <p className="shrink-0 grow-0 text-left text-sm font-medium text-gray-700">
                    Approval rules
                  </p>
                  <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                    n/a
                  </p>
                </div>
                <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-[13px] self-stretch">
                  <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                    <p className="shrink-0 grow-0 text-left text-sm font-medium text-gray-700">
                      Start date
                    </p>
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      06/09/2023 1:00PM
                    </p>
                  </div>
                  <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                    <p className="shrink-0 grow-0 text-left text-sm font-medium text-gray-700">
                      End date
                    </p>
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      06/16/2023 1:00PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[326px] shrink-0 grow-0 flex-col items-start justify-start gap-4 rounded-lg border-[0.8px] border-gray-200 p-6">
            <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-4 self-stretch">
              <p className="w-[278px] shrink-0 grow-0 self-stretch text-left text-base font-medium text-[#1f2a37]">
                Participants
              </p>
            </div>
            <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-3 self-stretch">
              <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-3 self-stretch">
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <div className="relative flex shrink-0 grow-0 items-center justify-start gap-4">
                    <div className="relative h-6 w-6 shrink-0 grow-0 overflow-hidden rounded-xl bg-white">
                      <div className="absolute left-[-1px] top-[-1px] h-6 w-3 bg-[#fa09e5]" />
                      <div className="absolute left-[-1px] top-[11px] h-3 w-6 bg-[#4bc8ab]" />
                    </div>
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      0x0c2...368g
                    </p>
                  </div>
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
                      d="M9.99992 12.5V14.1667M4.99992 17.5H14.9999C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6993 16.6666 16.2754 16.6666 15.8333V10.8333C16.6666 10.3913 16.491 9.96738 16.1784 9.65482C15.8659 9.34226 15.4419 9.16667 14.9999 9.16667H4.99992C4.55789 9.16667 4.13397 9.34226 3.82141 9.65482C3.50885 9.96738 3.33325 10.3913 3.33325 10.8333V15.8333C3.33325 16.2754 3.50885 16.6993 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5ZM13.3333 9.16667V5.83333C13.3333 4.94928 12.9821 4.10143 12.3569 3.47631C11.7318 2.85119 10.884 2.5 9.99992 2.5C9.11586 2.5 8.26802 2.85119 7.6429 3.47631C7.01777 4.10143 6.66659 4.94928 6.66659 5.83333V9.16667H13.3333Z"
                      stroke="#9CA3AF"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <div className="relative flex shrink-0 grow-0 items-center justify-start gap-4">
                    <div className="relative h-6 w-6 shrink-0 grow-0 overflow-hidden rounded-xl bg-white">
                      <div className="absolute left-[-1px] top-[-1px] h-6 w-3 bg-[#e5f8a1]" />
                      <div className="absolute left-[-1px] top-[11px] h-3 w-6 bg-[#358daa]" />
                    </div>
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      0x382...8b3e
                    </p>
                  </div>
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
                      d="M9.99992 12.5V14.1667M4.99992 17.5H14.9999C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6993 16.6666 16.2754 16.6666 15.8333V10.8333C16.6666 10.3913 16.491 9.96738 16.1784 9.65482C15.8659 9.34226 15.4419 9.16667 14.9999 9.16667H4.99992C4.55789 9.16667 4.13397 9.34226 3.82141 9.65482C3.50885 9.96738 3.33325 10.3913 3.33325 10.8333V15.8333C3.33325 16.2754 3.50885 16.6993 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5ZM13.3333 9.16667V5.83333C13.3333 4.94928 12.9821 4.10143 12.3569 3.47631C11.7318 2.85119 10.884 2.5 9.99992 2.5C9.11586 2.5 8.26802 2.85119 7.6429 3.47631C7.01777 4.10143 6.66659 4.94928 6.66659 5.83333V9.16667H13.3333Z"
                      stroke="#9CA3AF"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <div className="relative flex shrink-0 grow-0 items-center justify-start gap-4">
                    <div className="relative h-6 w-6 shrink-0 grow-0 overflow-hidden rounded-xl bg-white">
                      <div className="absolute left-[-1px] top-[-1px] h-6 w-3 bg-[#aa05e9]" />
                      <div className="absolute left-[-1px] top-[11px] h-3 w-6 bg-[#126adb]" />
                    </div>
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      0x382...8b3e
                    </p>
                  </div>
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
                      d="M9.99992 12.5V14.1667M4.99992 17.5H14.9999C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6993 16.6666 16.2754 16.6666 15.8333V10.8333C16.6666 10.3913 16.491 9.96738 16.1784 9.65482C15.8659 9.34226 15.4419 9.16667 14.9999 9.16667H4.99992C4.55789 9.16667 4.13397 9.34226 3.82141 9.65482C3.50885 9.96738 3.33325 10.3913 3.33325 10.8333V15.8333C3.33325 16.2754 3.50885 16.6993 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5ZM13.3333 9.16667V5.83333C13.3333 4.94928 12.9821 4.10143 12.3569 3.47631C11.7318 2.85119 10.884 2.5 9.99992 2.5C9.11586 2.5 8.26802 2.85119 7.6429 3.47631C7.01777 4.10143 6.66659 4.94928 6.66659 5.83333V9.16667H13.3333Z"
                      stroke="#9CA3AF"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <div className="relative flex shrink-0 grow-0 items-center justify-start gap-4">
                    <div className="relative h-6 w-6 shrink-0 grow-0 overflow-hidden rounded-xl bg-white">
                      <div className="absolute left-[-1px] top-[-1px] h-6 w-3 bg-[#ad860a]" />
                      <div className="absolute left-[-1px] top-[11px] h-3 w-6 bg-[#48aeb5]" />
                    </div>
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      0x382...8b3e
                    </p>
                  </div>
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
                      d="M9.99992 12.5V14.1667M4.99992 17.5H14.9999C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6993 16.6666 16.2754 16.6666 15.8333V10.8333C16.6666 10.3913 16.491 9.96738 16.1784 9.65482C15.8659 9.34226 15.4419 9.16667 14.9999 9.16667H4.99992C4.55789 9.16667 4.13397 9.34226 3.82141 9.65482C3.50885 9.96738 3.33325 10.3913 3.33325 10.8333V15.8333C3.33325 16.2754 3.50885 16.6993 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5ZM13.3333 9.16667V5.83333C13.3333 4.94928 12.9821 4.10143 12.3569 3.47631C11.7318 2.85119 10.884 2.5 9.99992 2.5C9.11586 2.5 8.26802 2.85119 7.6429 3.47631C7.01777 4.10143 6.66659 4.94928 6.66659 5.83333V9.16667H13.3333Z"
                      stroke="#9CA3AF"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative flex shrink-0 grow-0 items-center justify-center gap-1 self-stretch">
                <p className="shrink-0 grow-0 text-left text-sm text-[#1c64f2]">
                  View all
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposals1;
