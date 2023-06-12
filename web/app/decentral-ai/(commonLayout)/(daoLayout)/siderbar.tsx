"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Menu from "../menu";
import { useWorkspacesContext } from "@/context/workspace-context";
import JoinButton from "./JoinButton";

const menuData = [
  {
    name: "Overview",
    path: "/decentral-ai/overview",
    value: "overview",
  },
  {
    name: "Members",
    path: "#",
    value: "members",
  },
  {
    name: "Apps",
    path: "/decentral-ai/apps",
    value: "apps",
  },
  {
    name: "Datasets",
    path: "/decentral-ai/datasets",
    value: "datasets",
  },
  {
    name: "Proposals",
    path: "#",
    value: "proposals",
  },
  {
    name: "Finance",
    path: "#",
    value: "finance",
  },
  {
    name: "Settings",
    path: "#",
    value: "settings",
  },
];

const Sidebar = () => {
  const segment = useSelectedLayoutSegment();
  const { workspaces } = useWorkspacesContext();
  const currentWorkspace = workspaces.find((workspace) => workspace.current);
  const activeValue =
    (segment &&
      menuData.find((data) => {
        return data.path.includes(segment);
      })?.value) ??
    undefined;

  return (
    <aside className="h-full" aria-label="Sidebar">
      <div className="box-border h-[52px] border-b border-gray-200 flex items-center px-4">
        <p className="text-lg font-medium text-gray-800 truncate">
          {currentWorkspace?.name}
        </p>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2 p-4">
          <JoinButton />
          {/* <button
            type="button"
            className="rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Join
          </button> */}
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Consume
          </button>
        </div>
        <Menu items={menuData} activeValue={activeValue} />
      </div>
    </aside>
  );
};

export default Sidebar;
