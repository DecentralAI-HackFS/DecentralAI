import Sidebar from "./siderbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-300 h-full pt-9">
      <div className="flex max-w-[962px] mx-auto gap-[88px]">
        <div className="w-[238px] bg-slate-500">
          <Sidebar />
        </div>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
