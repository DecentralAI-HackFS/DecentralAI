import type { Fetcher } from "swr";
import { post } from "./base";

export const createDao: Fetcher<
  any,
  {
    daoName: string;
  }
> = ({ daoName }) => {
  return post("/workspaces", {
    body: { name: daoName },
  }) as Promise<any>;
};
