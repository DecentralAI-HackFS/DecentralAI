import { switchWorkspace } from "@/service/common";
import { useTranslation } from "react-i18next";
import { useContext } from "use-context-selector";
import { ToastContext } from "@/app/components/base/toast";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useWorkspacesContext } from "@/context/workspace-context";
import NavItem from "./navItem";
import { useSWRConfig } from "swr";

const WorkspaceNavItems = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { notify } = useContext(ToastContext);
  const { workspaces } = useWorkspacesContext();
  const { mutate } = useSWRConfig();
  const segment = useSelectedLayoutSegment();
  const handleSwitchWorkspace = async (tenant_id: string) => {
    try {
      await switchWorkspace({ url: `/workspaces/switch`, body: { tenant_id } });

      mutate({ url: "/workspaces" });
      mutate({ url: "/apps", params: { page: 1, limit: 30 } });
      mutate({ url: "/datasets", params: { page: 1, limit: 30 } });
      // notify({
      //   type: "success",
      //   message: t("common.actionMsg.modifiedSuccessfully"),
      // });
      router.push("/decentral-ai/overview");
    } catch (e) {
      notify({ type: "error", message: t("common.provider.saveFailed") });
    } finally {
    }
  };

  return (
    <>
      {workspaces.map((workspace) => (
        <NavItem
          active={
            segment !== "dao" && segment !== "explore" && workspace.current
          }
          onClick={() => {
            handleSwitchWorkspace(workspace.id);
          }}
        >
          <div>{workspace.name[0].toLocaleUpperCase()}</div>
        </NavItem>
      ))}
    </>
  );
};

export default WorkspaceNavItems;
