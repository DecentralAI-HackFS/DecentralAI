import type { Fetcher } from "swr";
import { get, post } from "./base";

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

export const getAllDaoApps: Fetcher<any, string> = () => {
  return get("/workspaces/all") as Promise<any>;
};

export const getOneDaoApp: Fetcher<any, {
  id: string;
}> = ({id}) => {
  return get(`/workspaces/${id}`) as Promise<any>;
};

export const joinDaoApp: Fetcher<
  any,
  {
    daoId: string;
    role: string;
  }
> = ({ daoId, role }) => {
  return post("/workspaces/current/members", {
    body: { tenant_id: daoId, role },
  }) as Promise<any>;
};
