import { WorkspaceProvider } from "@/context/workspace-context";
import Sidebar from "./siderbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WorkspaceProvider>
      <div className="flex h-full">
        <div className="box-border w-[240px] shrink-0 border-r border-gray-200">
          <Sidebar />
        </div>
        <div className="grow">{children}</div>
      </div>
    </WorkspaceProvider>
  );
};

export default Layout;
