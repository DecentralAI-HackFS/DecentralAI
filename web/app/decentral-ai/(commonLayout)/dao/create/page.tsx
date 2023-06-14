"use client";

import { useMemo, useState } from "react";

import CreateNewDaoStep from "./create-new-dao-step";
import { StepType } from "./enum/step";
import MintYourTokenStep from "./mint-your-token-step";
import ReviewStep from "./review-step";
import Steps from "./steps";
import { useForm } from "react-hook-form";
import { createDao } from "@/service/dao";
import { useRouter } from "next/navigation";
import { DaoFormData } from "./model/daoForm";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";


const DaoCreation = () => {
  const [step, setStep] = useState(StepType.CREATE_NEW_DAO);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DaoFormData>();
  const { address} = useAccount();
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

  const steps = useMemo(() => {
    const tempSteps = [
      {
        name: "Create new DAO",
        status: "upcoming",
      },
      {
        name: "Mint your token",
        status: "upcoming",
      },
      {
        name: "Review",
        status: "upcoming",
      },
    ];
    return tempSteps.map((item, index) => {
      if (index + 1 < step) {
        return { ...item, status: "complete" };
      }
      if (index + 1 === step) {
        return { ...item, status: "current" };
      }
      return item;
    });
  }, [step]);

  const handleCreateNewDao = async (data: DaoFormData) => {
    await writeAsync!();
    createDao({ daoName: data.daoName }).then((res: any) => {
      if (res.result === "success") {
        router.push(`/decentral-ai/apps`);
      }
    });
  };

  console.log(watch("daoSampleData"))

  return (
    <div className="h-full">
      <div className="mx-auto flex h-full gap-[88px]">
        <div className="ml-[211px] w-[238px] shrink-0 pb-20 pt-9">
          <Steps steps={steps} />
        </div>
        <div className="box-border h-full grow overflow-auto pb-20 pt-9">
          <div className="max-w-[684px] pr-4">
            {step === StepType.CREATE_NEW_DAO && (
              <CreateNewDaoStep
                onChangeStep={setStep}
                register={register}
              />
            )}
            {step === StepType.MINT_YOUR_TOKEN && (
              <MintYourTokenStep onChangeStep={setStep} register={register} />
            )}
            {step === StepType.REVIEW && (
              <ReviewStep
                formData={{
                  daoName: watch("daoName"),
                  daoDescription: watch("daoDescription"),
                  daoLogo: watch("daoLogo"),
                  daoAbout: watch("daoAbout"),
                  daoSampleData: watch("daoSampleData"),
                  tokenName: watch("tokenName"),
                  tokenSymbol: watch("tokenSymbol"),
                  tokenSupply: watch("tokenSupply"),
                }}
                onChangeStep={setStep}
                onSubmit={handleSubmit(handleCreateNewDao)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaoCreation;
