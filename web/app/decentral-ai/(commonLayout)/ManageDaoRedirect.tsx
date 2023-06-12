"use client";
import { useWorkspacesContext } from "@/context/workspace-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ManageDaoRedirect = () => {
  const router = useRouter();
  const { workspaces } = useWorkspacesContext();

  useEffect(() => {
    console.log("workspaces", workspaces);
    if (workspaces.length === 0) {
      router.push("/decentral-ai/dao/create");
    } else {
      router.push("/decentral-ai/apps");
    }
  }, [workspaces]);

  return <></>;
};

export default ManageDaoRedirect;
