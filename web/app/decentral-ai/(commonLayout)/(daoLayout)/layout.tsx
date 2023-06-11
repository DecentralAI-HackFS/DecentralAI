import { WorkspaceProvider } from "@/context/workspace-context";
import Sidebar from "./siderbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <div className="box-border w-[240px] border-r border-gray-200">
        <WorkspaceProvider>
          <Sidebar />
        </WorkspaceProvider>
      </div>
      <div className="grow">{children}</div>
    </div>
  );
};

export default Layout;
