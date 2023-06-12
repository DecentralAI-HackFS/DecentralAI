"use client";

import { useEffect, useRef } from "react";
import { fetchDatasets } from "@/service/datasets";
import DatasetCard from "./DatasetCard";
import NewDatasetCard from "./NewDatasetCard";
import useSWR from "swr";

const Datasets = () => {
  const { data, isLoading, mutate } = useSWR(
    { url: "/datasets", params: { page: 1, limit: 30 } },
    fetchDatasets
  );
  const loadingStateRef = useRef(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadingStateRef.current = isLoading;
  }, [isLoading]);

  return (
    <nav className="grid content-start grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 grow shrink-0">
      {data?.data.map((dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} onDelete={mutate} />
      ))}
      <NewDatasetCard ref={anchorRef} />
    </nav>
  );
};

export default Datasets;
