"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Menu from "../../../menu";
import useSWR from "swr";
import { fetchAppDetail } from "@/service/apps";
import Link from "next/link";

interface SidebarProps {
  appId: string;
}

const Sidebar = ({ appId }: SidebarProps) => {
  const segment = useSelectedLayoutSegment();
  const detailParams = { url: "/apps", id: appId };
  const { data: response } = useSWR(detailParams, fetchAppDetail);

  const navigation = [
    {
      name: "Overview",
      path: `/decentral-ai/app/${appId}/overview`,
      value: "overview",
    },
    {
      name: "Prompt Eng.",
      path: `/decentral-ai/app/${appId}/configuration`,
      value: "promptEng",
    },
    {
      name: "API Access",
      path: `/decentral-ai/app/${appId}/develop`,
      value: "apiAccess",
    },
    {
      name: "Logs & Ann.",
      path: `/decentral-ai/app/${appId}/logs`,
      value: "logsAndAnn",
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
        <Link href="/decentral-ai/apps">
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
