import Loading from "@/app/components/base/loading";
import ManageDaoRedirect from "./ManageDaoRedirect";
import { WorkspaceProvider } from "@/context/workspace-context";

const Home = async () => {
  return (
    <div className="h-full">
      <WorkspaceProvider>
        <ManageDaoRedirect />
      </WorkspaceProvider>

      <Loading type="app" />
    </div>
  );
};

export default Home;
