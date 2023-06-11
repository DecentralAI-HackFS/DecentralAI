import DatasetFooter from "@/app/(commonLayout)/datasets/DatasetFooter";
import Datasets from "./Datasets";

const AppList = async () => {
  return (
    <div className="flex flex-col h-full overflow-auto shrink-0 grow">
      <Datasets />
      <DatasetFooter />
    </div>
  );
};

export default AppList;
