"use client";
import { fetchWorkspaces } from "@/service/common";
import Header from "./header";
import Sidebar from "./sidebar";
import useSWR from "swr";
import Loading from "@/app/components/base/loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useSWR({ url: "/workspaces" }, fetchWorkspaces, {});
  if (isLoading) {
    return <Loading type="app" />;
  }
  return (
    <div>
      <Header />
      <div className="h-[calc(100vh-64px)] flex box-border">
        <Sidebar />
        <div className="grow">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
