"use client";
import React, { FC, useEffect, useState } from "react";
import ExploreContext from "@/context/explore-context";
import Sidebar from "@/app/components/explore/sidebar";
import { useAppContext } from "@/context/app-context";
import { fetchMembers } from "@/service/common";
import { InstalledApp } from "@/models/explore";
import { useTranslation } from "react-i18next";

export interface IExploreProps {
  children: React.ReactNode;
}

const ExploreLayout: FC<IExploreProps> = ({ children }) => {
  const { t } = useTranslation();
  const [controlUpdateInstalledApps, setControlUpdateInstalledApps] =
    useState(0);
  const { userProfile } = useAppContext();
  const [hasEditPermission, setHasEditPermission] = useState(false);
  const [installedApps, setInstalledApps] = useState<InstalledApp[]>([]);

  useEffect(() => {
    document.title = `${t("explore.title")} -  Dify`;
    (async () => {
      const { accounts } = await fetchMembers({
        url: "/workspaces/current/members",
        params: {},
      });
      if (!accounts) return;
      const currUser = accounts.find(
        (account) => account.id === userProfile.id
      );
      setHasEditPermission(currUser?.role !== "normal");
    })();
  }, []);

  return (
    <ExploreContext.Provider
      value={{
        controlUpdateInstalledApps,
        setControlUpdateInstalledApps,
        hasEditPermission,
        installedApps,
        setInstalledApps,
      }}
    >
      <div className="grow">{children}</div>
    </ExploreContext.Provider>
  );
};
export default ExploreLayout;
