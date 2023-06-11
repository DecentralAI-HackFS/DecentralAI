import Sidebar from "./siderbar";

interface LayoutProps {
  children: React.ReactNode;
  params: { datasetId: string };
}

const Layout = ({ children, params: { datasetId } }: LayoutProps) => {
  return (
    <div className="flex h-full">
      <div className="box-border w-[240px] shrink-0 border-r border-gray-200">
        <Sidebar datasetId={datasetId} />
      </div>
      <div className="grow">{children}</div>
    </div>
  );
};

export default Layout;
