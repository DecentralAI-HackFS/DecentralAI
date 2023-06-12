import Header from "./header";
import Sidebar from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
