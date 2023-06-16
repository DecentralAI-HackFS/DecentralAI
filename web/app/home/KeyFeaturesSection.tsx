'use client';

import classNames from 'classnames';
import { useState } from 'react';

import classes from './style/index.module.scss';

const features = [
  {
    id: 1,
    name: 'Decentralized RLHF with Zero Knowledge Voting',
    image: '/images/home/feature1.png',
    description:
      'Decentralized RLHF with Zero Knowledge Voting: crowd sourcing RLHF by collecting diverse responses from the community and using anonymous voting to determine the best responses. This iterative process helps fine-tune AI models, enabling them to better understand complex human preferences and produce more accurate, coherent, and contextually relevant outputs.',
  },
  {
    id: 2,
    name: 'Comprehensive LLM Solutions',
    image: '/images/home/feature2.png',
    description:
      'Comprehensive LLM Solutions: DecentralAI provides a no-coding experiences for AI app creation, context embedding and API serving so others can build on top of your AI app.',
  },
  {
    id: 3,
    name: 'Build AI, Together',
    image: '/images/home/feature3.png',
    description:
      "Build AI, Together: Create your DAO on our AI tech stack, enabling collective contributions and equitable distribution of AI benefits within the community. Together, let's build a future where AI is owned and governed by the people.",
  },
];

const KeyFeaturesSection = () => {
  const [currentId, setCurrentId] = useState(1);

  return (
    <div className="flex w-[1088px] flex-col items-center justify-start gap-14">
      <div className="relative flex shrink-0 grow-0 items-start justify-center self-stretch">
        <p className="w-[1088px] grow text-center text-[40px] font-bold text-[#f7fafc]">
          Key Features
        </p>
      </div>
      <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-10 self-stretch">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {features.map((tab) => (
            <div
              key={tab.name}
              className={classNames(
                tab.id === currentId
                  ? classes.active
                  : 'border-transparent hover:border-gray-300',
                'whitespace-nowrap border-b-[5px] text-[#F7FAFC] border-white/10 py-6 px-7 text-xl font-bold cursor-pointer',
                classes.tab
              )}
              onClick={() => {
                setCurrentId(tab.id);
              }}
            >
              {tab.name}
            </div>
          ))}
        </nav>
        <div className="relative flex shrink-0 grow-0 items-start justify-between self-stretch">
          <img
            src={features[currentId - 1]?.image}
            alt="feature"
            className="h-[449px] w-[788px] shrink-0 grow-0 rounded-[20px] object-contain"
          />
          <div className="flex w-[274px] shrink-0 grow-0 flex-col items-start justify-start gap-4 self-stretch">
            <div className="flex grow flex-col items-start justify-start gap-2.5 self-stretch rounded-[20px] py-6">
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-3 self-stretch">
                <p className="w-[274px] shrink-0 grow-0 self-stretch text-left text-lg leading-8 text-[#f7fafc]">
                  {features[currentId - 1]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFeaturesSection;
