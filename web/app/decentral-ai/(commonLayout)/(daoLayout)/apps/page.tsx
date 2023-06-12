"use client";

import { useEffect, useRef } from "react";
import { fetchAppList } from "@/service/apps";
import { NEED_REFRESH_APP_LIST_KEY } from "@/config";
import { useTranslation } from "react-i18next";
import NewAppCard from "@/app/(commonLayout)/apps/NewAppCard";
import AppCard from "./AppCard";
import useSWR from "swr";

const Apps = () => {
  const { t } = useTranslation();
  const { data, isLoading, mutate } = useSWR(
    { url: "/apps", params: { page: 1, limit: 30 } },
    fetchAppList
  );
  const loadingStateRef = useRef(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.title = `${t("app.title")} -  Dify`;
    if (localStorage.getItem(NEED_REFRESH_APP_LIST_KEY) === "1") {
      localStorage.removeItem(NEED_REFRESH_APP_LIST_KEY);
      mutate();
    }
  }, []);

  useEffect(() => {
    loadingStateRef.current = isLoading;
  }, [isLoading]);

  // useEffect(() => {
  //   const onScroll = debounce(() => {
  //     if (!loadingStateRef.current) {
  //       const { scrollTop, clientHeight } = pageContainerRef.current!;
  //       const anchorOffset = anchorRef.current!.offsetTop;
  //       if (anchorOffset - scrollTop - clientHeight < 100) {
  //         setSize((size) => size + 1);
  //       }
  //     }
  //   }, 50);

  //   pageContainerRef.current?.addEventListener("scroll", onScroll);
  //   return () =>
  //     pageContainerRef.current?.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <nav className="grid content-start grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 grow shrink-0">
      {data?.data.map((app) => (
        <AppCard key={app.id} app={app} onDelete={mutate} />
      ))}
      <NewAppCard ref={anchorRef} onSuccess={mutate} />
    </nav>
  );
};

export default Apps;
