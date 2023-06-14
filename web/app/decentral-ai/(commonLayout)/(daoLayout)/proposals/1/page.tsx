import Link from 'next/link';

const Proposals1 = () => {
  return (
    <div className="mt-4 pb-20 flex justify-center gap-[120px]">
      <div>
        <div className="flex w-[564px] flex-col items-start justify-start gap-10">
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
                          d="M9.99992 13.1666L5.33325 8.49992L9.99992 3.83325"
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
                  Add data: A Comprehensive Tutorial on Using FVM.txt
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
            <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
                <p className="shrink-0 grow-0 text-left text-base font-medium text-gray-700">
                  Abstract
                </p>
                <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                  Add new data to FVMLearn dataset.
                </p>
              </div>
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-2">
                <p className="shrink-0 grow-0 text-left text-base font-medium text-gray-700">
                  Proposal
                </p>
                <p className="w-[557px] shrink-0 grow-0 text-left text-sm">
                  <span className="w-[557px] shrink-0 grow-0 text-left text-sm text-gray-700">
                    Member{' '}
                  </span>
                  <span className="w-[557px] shrink-0 grow-0 text-left text-sm text-[#1c64f2]">
                    0xF17...3973
                  </span>
                  <span className="w-[557px] shrink-0 grow-0 text-left text-sm text-gray-700">
                    {' '}
                    has uploaded new data to the FVMLearn dataset. To assist in
                    cleaning the dataset, please click the link below to access
                    the dataset page and flag any paragraphs that you believe do
                    not fit the dataset.
                  </span>
                  <br />
                  <br />
                  <span className="w-[557px] shrink-0 grow-0 text-left text-sm text-gray-700">
                    The review period spans 7 days, from June 9th to June 16th.
                  </span>
                  <br />
                  <br />
                  <span className="w-[557px] shrink-0 grow-0 text-left text-sm text-gray-700">
                    Each wallet holds one vote for each paragraph. If the data
                    accumulates more than 5 flags by the end of the review
                    period, it will be removed from the dataset.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 grow-0 items-start justify-start gap-2.5 self-stretch rounded-lg bg-gray-50 px-6 py-4">
            <div className="flex grow items-center justify-start gap-[47px]">
              <div className="flex grow items-center justify-center gap-2">
                <div className="flex w-[348px] shrink-0 grow-0 flex-col items-start justify-start gap-2">
                  <div className="relative flex shrink-0 grow-0 items-center justify-start gap-1 self-stretch">
                    <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                      A Comprehensive Tutorial on Using FVM.txt
                    </p>
                  </div>
                  <div className="flex shrink-0 grow-0 items-start justify-start gap-4 self-stretch">
                    <div className="relative flex shrink-0 grow-0 items-center justify-start gap-1 py-1">
                      <svg
                        width={12}
                        height={13}
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative h-3 w-3 shrink-0 grow-0"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          d="M4.5 6.5H7.5M4.5 8.5H7.5M8.5 11H3.5C3.23478 11 2.98043 10.8946 2.79289 10.7071C2.60536 10.5196 2.5 10.2652 2.5 10V3C2.5 2.73478 2.60536 2.48043 2.79289 2.29289C2.98043 2.10536 3.23478 2 3.5 2H6.293C6.4256 2.00003 6.55275 2.05273 6.6465 2.1465L9.3535 4.8535C9.44728 4.94725 9.49997 5.0744 9.5 5.207V10C9.5 10.2652 9.39464 10.5196 9.20711 10.7071C9.01957 10.8946 8.76522 11 8.5 11Z"
                          stroke="#9CA3AF"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p className="shrink-0 grow-0 text-left text-sm text-gray-500">
                        5.5k
                      </p>
                    </div>
                    <div className="relative flex shrink-0 grow-0 items-center justify-start gap-1 py-1">
                      <svg
                        width={12}
                        height={13}
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative h-3 w-3 shrink-0 grow-0"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          d="M6 4.5V6.5L7.5 8M10.5 6.5C10.5 7.09095 10.3836 7.67611 10.1575 8.22208C9.93131 8.76804 9.59984 9.26412 9.18198 9.68198C8.76412 10.0998 8.26804 10.4313 7.72208 10.6575C7.17611 10.8836 6.59095 11 6 11C5.40905 11 4.82389 10.8836 4.27792 10.6575C3.73196 10.4313 3.23588 10.0998 2.81802 9.68198C2.40016 9.26412 2.06869 8.76804 1.84254 8.22208C1.6164 7.67611 1.5 7.09095 1.5 6.5C1.5 5.30653 1.97411 4.16193 2.81802 3.31802C3.66193 2.47411 4.80653 2 6 2C7.19347 2 8.33807 2.47411 9.18198 3.31802C10.0259 4.16193 10.5 5.30653 10.5 6.5Z"
                          stroke="#9CA3AF"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p className="shrink-0 grow-0 text-left text-sm text-gray-500">
                        06/09/2023 1:00 PM{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex grow items-center justify-end gap-[3px]">
                  <div className="relative flex shrink-0 grow-0 cursor-pointer items-center justify-center gap-1 p-1">
                    <p className="shrink-0 grow-0 text-left text-sm text-[#1c64f2]">
                      Open
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
                        d="M6.66675 3.99984H4.00008C3.64646 3.99984 3.30732 4.14031 3.05727 4.39036C2.80722 4.64041 2.66675 4.97955 2.66675 5.33317V11.9998C2.66675 12.3535 2.80722 12.6926 3.05727 12.9426C3.30732 13.1927 3.64646 13.3332 4.00008 13.3332H10.6667C11.0204 13.3332 11.3595 13.1927 11.6096 12.9426C11.8596 12.6926 12.0001 12.3535 12.0001 11.9998V9.33317M9.33341 2.6665H13.3334M13.3334 2.6665V6.6665M13.3334 2.6665L6.66675 9.33317"
                        stroke="#1C64F2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
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
              <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-3 self-stretch">
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <p className="shrink-0 grow-0 text-left text-sm font-medium text-gray-700">
                    Proposal type
                  </p>
                  <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                    Dataset
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
                    Flag unqualified
                  </p>
                </div>
                <div className="relative flex shrink-0 grow-0 items-center justify-between self-stretch">
                  <p className="shrink-0 grow-0 text-left text-sm font-medium text-gray-700">
                    Approval rules
                  </p>
                  <p className="shrink-0 grow-0 text-left text-sm text-gray-700">
                    Less than 5 flags
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
                <p className="shrink-0 grow-0 cursor-pointer text-left text-sm text-[#1c64f2]">
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
