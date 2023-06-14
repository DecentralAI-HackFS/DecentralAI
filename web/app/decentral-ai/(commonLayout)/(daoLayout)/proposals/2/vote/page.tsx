'use client';

import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';

const mailingLists = [
  {
    id: 1,
    title:
      "To begin your journey with the FileCoin Virtual Machine (FVM), I recommend exploring the official FileCoin documentation, where you'll find comprehensive guides and resources to get you started on the right track.",
    // description: 'Add data to DAO.',
  },
  {
    id: 2,
    title:
      'Joining online communities and forums focused on FileCoin can be a valuable step in your FVM learning process. Engage with experienced developers, ask questions, and learn from their insights and experiences.',
    // description: 'Process and clean the data.',
  },
  {
    id: 3,
    title:
      'Enhance your understanding of FVM by attending webinars and workshops conducted by FileCoin experts. These interactive sessions provide practical demonstrations, best practices, and opportunities to interact with industry professionals.',
    // description: 'Store DAO data.',
  },
  {
    id: 4,
    title:
      'Numerous online tutorials and video guides are available specifically designed for beginners like you who want to dive into FVM. These resources offer step-by-step instructions, code examples, and hands-on exercises to help you gain confidence in using the FileCoin Virtual Machine.',
    // description: 'Help fine-tune the chatbot with human instruction.',
  },
  {
    id: 5,
    title:
      'FVMCopilotDAO, a dedicated educational platform, can provide you with tailored guidance and personalized instructions for utilizing FVM. Joining this community will allow you to access a dynamic platform for collaboration, refinement, and continuous expansion of educational resources related to FVM.',
    // description: 'Host the application.',
  },
];

const Vote = () => {
  return (
    <div>
      <div className="mx-auto flex w-[564px] flex-col items-start justify-start gap-6 pt-4">
        <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
          <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-2 self-stretch">
            <div className="flex w-[205px] shrink-0 grow-0 items-start justify-start gap-4">
              <div className="flex w-[238px] shrink-0 grow-0 flex-col items-start justify-start gap-4 rounded-lg">
                <Link href="/decentral-ai/proposals/2">
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
            <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-4 self-stretch">
              <p className="w-[564px] shrink-0 grow-0 self-stretch text-left text-xl font-medium text-[#1f2a37]">
                How can I get started with the FileCoin Virtual Machine?
              </p>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-3 self-stretch">
          <RadioGroup className="w-full">
            <div className="mt-4 flex flex-col gap-3">
              {mailingLists.map((mailingList) => (
                <RadioGroup.Option
                  key={mailingList.id}
                  value={mailingList}
                  className={({ checked, active }) =>
                    classNames(
                      checked ? 'border-transparent' : 'border-gray-300',
                      active ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                      'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none items-center'
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
                          {/* <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            {mailingList.description}
                          </RadioGroup.Description> */}
                        </span>
                      </span>
                      <span
                        className={classNames(
                          checked
                            ? 'bg-indigo-600 border-transparent'
                            : 'bg-white border-gray-300',
                          'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                        )}
                        aria-hidden="true"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      <span
                        className={classNames(
                          active ? 'border' : 'border-2',
                          checked ? 'border-indigo-600' : 'border-transparent',
                          'pointer-events-none absolute -inset-px rounded-lg'
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <div className="flex shrink-0 grow-0 items-center justify-end self-stretch py-4">
            <div className="relative flex grow cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-blue-600 py-2.5 hover:bg-blue-800">
              <p className="shrink-0 grow-0 text-left text-sm font-medium text-white">
                Vote
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
