import { switchWorkspace } from "@/service/common";
import { useTranslation } from "react-i18next";
import { useContext } from "use-context-selector";
import { ToastContext } from "@/app/components/base/toast";
import { useRouter } from "next/navigation";
import { useWorkspacesContext } from "@/context/workspace-context";
import NavItem from "./navItem";

const WorkspaceNavItems = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { notify } = useContext(ToastContext);
  const { workspaces } = useWorkspacesContext();

  const handleSwitchWorkspace = async (tenant_id: string) => {
    try {
      await switchWorkspace({ url: `/workspaces/switch`, body: { tenant_id } });
      notify({
        type: "success",
        message: t("common.actionMsg.modifiedSuccessfully"),
      });
      router.replace("/decentral-ai");
    } catch (e) {
      notify({ type: "error", message: t("common.provider.saveFailed") });
    } finally {
    }
  };

  return (
    <>
      {workspaces.map((workspace) => (
        <NavItem
          active={workspace.current}
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
