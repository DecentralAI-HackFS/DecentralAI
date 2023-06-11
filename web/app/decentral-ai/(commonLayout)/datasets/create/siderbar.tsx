"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Steps from "../../dao/create/steps";
import { useMemo } from "react";

interface SidebarProps {
  step: number;
  datasetId?: string;
}

const Sidebar = ({ step, datasetId }: SidebarProps) => {
  const steps = useMemo(() => {
    const tempSteps = [
      {
        name: "Choose data source",
        status: "upcoming",
      },
      {
        name: "Text Preprocessing and Cleaning",
        status: "upcoming",
      },
      {
        name: "Execute and finish",
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

  return (
    <aside className="h-full" aria-label="Sidebar">
      <div className="box-border h-[52px] border-b border-gray-200">
        <Link
          href={
            datasetId
              ? `/decentral-ai/datasets/${datasetId}/documents`
              : "/decentral-ai/datasets"
          }
        >
          <div className="flex h-full items-center px-4 gap-1 cursor-pointer">
            <ChevronLeftIcon className="w-6 h-6" />
            <p className="text-lg font-medium text-gray-800">Add Data</p>
          </div>
        </Link>
      </div>
      <div className="p-4">
        <Steps steps={steps} />
      </div>
    </aside>
  );
};

export default Sidebar;
