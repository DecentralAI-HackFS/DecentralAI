"use client";
import React, { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useContext } from "use-context-selector";
import ExploreContext from "@/context/explore-context";
import { App, Dao } from "@/models/explore";
import Category from "@/app/components/explore/category";
import { installApp, fetchAppDetail } from "@/service/explore";
import { createApp } from "@/service/apps";
import CreateAppModal from "@/app/components/explore/create-app-modal";
import Loading from "@/app/components/base/loading";
import { NEED_REFRESH_APP_LIST_KEY } from "@/config";
import useSWR from 'swr'

import s from "./style.module.css";
import Toast from "@/app/components/base/toast";
import { getAllDaoApps, joinDaoApp } from "@/service/dao";
import AppCard from "@/app/decentral-ai/components/explore/app-card";
import { useSWRConfig } from "swr";
import { switchWorkspace } from "@/service/common";

const Apps: FC = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { setControlUpdateInstalledApps, hasEditPermission } =
    useContext(ExploreContext);
  const [currCategory, setCurrCategory] = React.useState("");
  const [allList, setAllList] = React.useState<App[]>([]);
  const { mutate } = useSWRConfig();
  const { data: response,isLoading } = useSWR("getAllDaoApps", getAllDaoApps)

  const currList = (() => {
    if (currCategory === "") return allList;
    return allList.filter((item) => item.category === currCategory);
  })();
  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    if (response) {
      setAllList(
        response.workspaces.map((item: Dao) => {
          return {
            app: {
              id: item.id,
              name: item.name,
              mode: "chat",
              icon: "🤖",
              icon_background: "#FFEAD5",
            },
            app_id: item.id,
            description: "",
            copyright: "Copyright 2023 DecentralAI",
            privacy_policy: "#",
            category: "Dao",
            // position: 3,
            is_listed: true,
            // install_count: 49,
            installed: false,
            editable: true,
          };
        })
      );
    }

  }, [response]);

  const handleAddToWorkspace = async (appId: string) => {
    // await installApp(appId);
    await joinDaoApp({ daoId: appId, role: "normal" });
    Toast.notify({
      type: "success",
      message: t("common.api.success"),
    });
    mutate({ url: "/workspaces" });
    setControlUpdateInstalledApps(Date.now());
  };

  const handleViewMore = async (appId: string) => {
    // await switchWorkspace({ url: `/workspaces/switch`, body: { tenant_id:appId } });
    // mutate({ url: "/workspaces" });
    // mutate({ url: "/apps", params: { page: 1, limit: 30 } });
    // mutate({ url: "/datasets", params: { page: 1, limit: 30 } })
    router.push(`/decentral-ai/overview/${appId}`);
  }

  const [currApp, setCurrApp] = React.useState<App | null>(null);
  const [isShowCreateModal, setIsShowCreateModal] = React.useState(false);
  const onCreate = async ({ name, icon, icon_background }: any) => {
    const { app_model_config: model_config } = await fetchAppDetail(
      currApp?.app.id as string
    );

    try {
      const app = await createApp({
        name,
        icon,
        icon_background,
        mode: currApp?.app.mode as any,
        config: model_config,
      });
      setIsShowCreateModal(false);
      Toast.notify({
        type: "success",
        message: t("app.newApp.appCreated"),
      });
      localStorage.setItem(NEED_REFRESH_APP_LIST_KEY, "1");
      router.push(`/decentral-ai/app/${app.id}/overview`);
    } catch (e) {
      Toast.notify({ type: "error", message: t("app.newApp.appCreateFailed") });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center">
        <Loading type="area" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 pt-6 px-12">
        <div className="mb-1 text-primary-600 text-xl font-semibold">
          {t("explore.apps.title")}
        </div>
        <div className="text-gray-500 text-sm">
          {t("explore.apps.description")}
        </div>
      </div>
      <Category
        className="mt-6 px-12"
        list={categories}
        value={currCategory}
        onChange={setCurrCategory}
      />
      <div
        className="flex mt-6 flex-col overflow-auto shrink-0 grow"
        style={{
          maxHeight: "calc(100vh - 243px)",
        }}
      >
        <nav
          className={`${s.appList} grid content-start grid-cols-1 gap-4 px-12 pb-10grow shrink-0`}
        >
          {currList.map((app) => (
            <AppCard
              key={app.app_id}
              app={app}
              onAddToWorkspace={handleAddToWorkspace}
              onViewMore={handleViewMore}
            />
          ))}
        </nav>
      </div>

      {isShowCreateModal && (
        <CreateAppModal
          appName={currApp?.app.name || ""}
          show={isShowCreateModal}
          onConfirm={onCreate}
          onHide={() => setIsShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default React.memo(Apps);
