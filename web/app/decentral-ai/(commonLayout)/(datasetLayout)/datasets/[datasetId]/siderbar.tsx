"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Menu from "../../../menu";
import useSWR from "swr";
import { fetchAppDetail } from "@/service/apps";
import Link from "next/link";
import { fetchDataDetail } from "@/service/datasets";

interface SidebarProps {
  datasetId: string;
}

const Sidebar = ({ datasetId }: SidebarProps) => {
  const segment = useSelectedLayoutSegment();
  const { data: response } = useSWR({
    action: 'fetchDataDetail',
    datasetId,
  }, apiParams => fetchDataDetail(apiParams.datasetId))

  const navigation = [
    {
      name: "Documents",
      path: `/decentral-ai/datasets/${datasetId}/documents`,
      value: "overview",
    },
    {
      name: "Hit Testing",
      path: `/decentral-ai/datasets/${datasetId}/hitTesting`,
      value: "promptEng",
    },
    {
      name: "Settings",
      path: `/decentral-ai/datasets/${datasetId}/settings`,
      value: "apiAccess",
    },
  ];

  const activeValue =
    (segment &&
      navigation.find((data) => {
        return data.path.includes(segment);
      })?.value) ??
    undefined;

  return (
    <aside className="h-full" aria-label="Sidebar">
      <div className="box-border h-[52px] border-b border-gray-200">
        <Link href="/decentral-ai/datasets">
          <div className="flex h-full items-center px-4 gap-1 cursor-pointer">
            <ChevronLeftIcon className="w-6 h-6" />
            <p className="text-lg font-medium text-gray-800">
              {response?.name}
            </p>
          </div>
        </Link>
      </div>
      <div className="py-3">
        <Menu items={navigation} activeValue={activeValue} />
      </div>
    </aside>
  );
};

export default Sidebar;
