import Sidebar from "./siderbar";

interface LayoutProps {
  children: React.ReactNode;
  params: { appId: string };
}

const Layout = ({ children, params: { appId } }: LayoutProps) => {
  return (
    <div className="flex h-full">
      <div className="box-border w-[240px] shrink-0 border-r border-gray-200">
        <Sidebar appId={appId} />
      </div>
      <div className="grow">{children}</div>
    </div>
  );
};

export default Layout;
