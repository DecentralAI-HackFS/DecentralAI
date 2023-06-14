import Link from 'next/link';

const Proposals2 = () => {
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
                  Fine tune chatbot: Vote responses for FVMCopilot
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
                  Review the human guidance given to the FVMCopilot chatbot and
                  select the three most relevant responses for training the AI.
                </p>
              </div>
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
                <p className="shrink-0 grow-0 text-left text-base font-medium text-gray-700">
                  Proposal
                </p>
                <p className="w-[557px] shrink-0 grow-0 text-left text-sm text-gray-700">
                  <span className="w-[557px] shrink-0 grow-0 text-left text-sm text-gray-700">
                    The FVMCopilot chatbot has received several negative
                    feedback recently, prompting the members of the DAO to
                    provide their expectations for AI responses. The voting
                    session has now commenced, where each wallet will have one
                    vote for each question. The top three answers will be used
                    to train the AI.{' '}
                  </span>
                  <br />
                  <br />
                  <span className="w-[557px] shrink-0 grow-0 text-left text-sm text-gray-700">
                    The period for reviewing answer suggestions will run from
                    June 16th to June 23rd, and it's important to note that
                    voting cannot be modified once it is submitted.
                  </span>
                </p>
              </div>
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
                <p className="shrink-0 grow-0 text-left text-base font-medium text-gray-700">
                  Human Instructions
                </p>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-4">
            <div className="flex w-[564px] shrink-0 grow-0 items-start justify-start gap-6 rounded-lg bg-gray-50 px-6 py-4">
              <div className="flex grow flex-col items-start justify-start gap-2">
                <div className="relative flex shrink-0 grow-0 items-center justify-start gap-10 self-stretch">
                  <p className="shrink-0 grow-0 text-left text-sm text-[#1f2a37]">
                    How can I get started with the FileCoin Virtual Machine?
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 grow-0 items-center justify-end gap-[3px] self-stretch">
                <Link href="/decentral-ai/proposals/2/vote">
                  <div className="relative flex shrink-0 grow-0 cursor-pointer items-center justify-center gap-1 p-1">
                    <p className="shrink-0 grow-0 text-left text-sm text-[#1c64f2]">
                      View
                    </p>
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
                        d="M9.17583 8.49994L8.82228 8.85349L6.18793 11.4878C6.18792 11.4879 6.1879 11.4879 6.18788 11.4879C6.13167 11.5441 6.1001 11.6204 6.1001 11.6999C6.1001 11.7794 6.13165 11.8557 6.18783 11.9119C6.18786 11.912 6.1879 11.912 6.18793 11.912M9.17583 8.49994L6.18793 11.912M9.17583 8.49994L8.82228 8.14638L6.19169 5.51579C6.13848 5.45948 6.10909 5.38472 6.10977 5.30716C6.11045 5.2285 6.142 5.15326 6.19763 5.09763C6.25325 5.04201 6.32849 5.01046 6.40715 5.00978C6.48471 5.0091 6.55947 5.03849 6.61578 5.0917L9.81192 8.28784C9.81194 8.28785 9.81196 8.28787 9.81197 8.28789C9.86818 8.34414 9.89976 8.42041 9.89976 8.49994C9.89976 8.57946 9.86818 8.65573 9.81197 8.71198C9.81196 8.712 9.81194 8.71202 9.81192 8.71204L6.61203 11.9119M9.17583 8.49994L6.61203 11.9119M6.18793 11.912C6.24418 11.9682 6.32043 11.9998 6.39993 11.9998C6.47945 11.9998 6.55572 11.9682 6.61197 11.912M6.18793 11.912L6.61197 11.912M6.61197 11.912L6.61203 11.9119M6.61197 11.912L6.61203 11.9119"
                        fill="#1F2A37"
                        stroke="#1C64F2"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex w-[564px] shrink-0 grow-0 items-start justify-start gap-6 rounded-lg bg-gray-50 px-6 py-4">
              <div className="flex grow flex-col items-start justify-start gap-2">
                <div className="relative flex shrink-0 grow-0 items-center justify-start gap-10 self-stretch">
                  <p className="w-[431px] grow text-left text-sm text-[#1f2a37]">
                    What are the key features and capabilities of the FileCoin
                    Virtual Machine?
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 grow-0 items-center justify-end gap-[3px] self-stretch">
                <Link href="/decentral-ai/proposals/2/vote">
                  <div className="relative flex shrink-0 grow-0 cursor-pointer items-center justify-center gap-1 p-1">
                    <p className="shrink-0 grow-0 text-left text-sm text-[#1c64f2]">
                      View
                    </p>
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative h-4 w-4 shrink-0 grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M9.17583 7.99994L8.82228 8.35349L6.18793 10.9878C6.18792 10.9879 6.1879 10.9879 6.18788 10.9879C6.13167 11.0441 6.1001 11.1204 6.1001 11.1999C6.1001 11.2794 6.13165 11.3557 6.18783 11.4119C6.18786 11.412 6.1879 11.412 6.18793 11.412M9.17583 7.99994L6.18793 11.412M9.17583 7.99994L8.82228 7.64638L6.19169 5.01579C6.13848 4.95948 6.10909 4.88472 6.10977 4.80716C6.11045 4.7285 6.142 4.65326 6.19763 4.59763C6.25325 4.54201 6.32849 4.51046 6.40715 4.50978C6.48471 4.5091 6.55947 4.53849 6.61578 4.5917L9.81192 7.78784C9.81194 7.78785 9.81196 7.78787 9.81197 7.78789C9.86818 7.84414 9.89976 7.92041 9.89976 7.99994C9.89976 8.07946 9.86818 8.15573 9.81197 8.21198C9.81196 8.212 9.81194 8.21202 9.81192 8.21204L6.61203 11.4119M9.17583 7.99994L6.61203 11.4119M6.18793 11.412C6.24418 11.4682 6.32043 11.4998 6.39993 11.4998C6.47945 11.4998 6.55572 11.4682 6.61197 11.412M6.18793 11.412L6.61197 11.412M6.61197 11.412L6.61203 11.4119M6.61197 11.412L6.61203 11.4119"
                        fill="#1F2A37"
                        stroke="#1C64F2"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex w-[564px] shrink-0 grow-0 items-start justify-start gap-6 rounded-lg bg-gray-50 px-6 py-4">
              <div className="flex grow flex-col items-start justify-start gap-2">
                <div className="relative flex shrink-0 grow-0 items-center justify-start gap-10 self-stretch">
                  <p className="w-[431px] grow text-left text-sm text-[#1f2a37]">
                    Can you provide step-by-step instructions for deploying
                    smart contracts on the FileCoin Virtual Machine?
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 grow-0 items-center justify-end gap-[3px] self-stretch">
                <Link href="/decentral-ai/proposals/2/vote">
                  <div className="relative flex shrink-0 grow-0 cursor-pointer items-center justify-center gap-1 p-1">
                    <p className="shrink-0 grow-0 text-left text-sm text-[#1c64f2]">
                      View
                    </p>
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative h-4 w-4 shrink-0 grow-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M9.17583 7.99994L8.82228 8.35349L6.18793 10.9878C6.18792 10.9879 6.1879 10.9879 6.18788 10.9879C6.13167 11.0441 6.1001 11.1204 6.1001 11.1999C6.1001 11.2794 6.13165 11.3557 6.18783 11.4119C6.18786 11.412 6.1879 11.412 6.18793 11.412M9.17583 7.99994L6.18793 11.412M9.17583 7.99994L8.82228 7.64638L6.19169 5.01579C6.13848 4.95948 6.10909 4.88472 6.10977 4.80716C6.11045 4.7285 6.142 4.65326 6.19763 4.59763C6.25325 4.54201 6.32849 4.51046 6.40715 4.50978C6.48471 4.5091 6.55947 4.53849 6.61578 4.5917L9.81192 7.78784C9.81194 7.78785 9.81196 7.78787 9.81197 7.78789C9.86818 7.84414 9.89976 7.92041 9.89976 7.99994C9.89976 8.07946 9.86818 8.15573 9.81197 8.21198C9.81196 8.212 9.81194 8.21202 9.81192 8.21204L6.61203 11.4119M9.17583 7.99994L6.61203 11.4119M6.18793 11.412C6.24418 11.4682 6.32043 11.4998 6.39993 11.4998C6.47945 11.4998 6.55572 11.4682 6.61197 11.412M6.18793 11.412L6.61197 11.412M6.61197 11.412L6.61203 11.4119M6.61197 11.412L6.61203 11.4119"
                        fill="#1F2A37"
                        stroke="#1C64F2"
                      />
                    </svg>
                  </div>
                </Link>
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
                    Top 3 answers
                  </p>
                </div>
                <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-[13px] self-stretch">
                  <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                    <p className="shrink-0 grow-0 text-left text-sm font-medium text-gray-700">
                      Start date
                    </p>
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      06/16/2023 1:00PM
                    </p>
                  </div>
                  <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                    <p className="shrink-0 grow-0 text-left text-sm font-medium text-gray-700">
                      End date
                    </p>
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      06/23/2023 1:00PM
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

export default Proposals2;
