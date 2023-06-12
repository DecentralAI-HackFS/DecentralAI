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


const DaoCreation = () => {
  const [step, setStep] = useState(StepType.CREATE_NEW_DAO);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DaoFormData>();

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

  const handleCreateNewDao = (data: DaoFormData) => {
    createDao({ daoName: data.daoName }).then((res: any) => {
      if (res.result === "success") {
        router.push(`/decentral-ai/apps`);
      }
    });
  };

  return (
    <div className="h-full">
      <div className="mx-auto flex h-full gap-[88px]">
        <div className="ml-[211px] w-[238px] shrink-0 pb-20 pt-9">
          <Steps steps={steps} />
        </div>
        <div className="box-border h-full grow overflow-auto pb-20 pt-9">
          <div className="max-w-[684px]">
            {step === StepType.CREATE_NEW_DAO && (
              <CreateNewDaoStep
                onChangeStep={setStep}
                register={register}
                errors={errors}
              />
            )}
            {step === StepType.MINT_YOUR_TOKEN && (
              <MintYourTokenStep onChangeStep={setStep} />
            )}
            {step === StepType.REVIEW && (
              <ReviewStep
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
