"use client";
import Avatar from "@/app/decentral-ai/components/base/avatar";
import Operation from "@/app/decentral-ai/components/header/account-setting/members-page/operation";
import { useAppContext } from "@/context/app-context";
import { fetchMembers } from "@/service/common";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

const Members = () => {
  const { t } = useTranslation();
  const RoleMap = {
    owner: t("common.members.owner"),
    admin: t("common.members.admin"),
    normal: t("common.members.normal"),
  };
  const { userProfile } = useAppContext();
  const { data, mutate } = useSWR(
    { url: "/workspaces/current/members" },
    fetchMembers
  );
  const accounts = data?.accounts || [];
  const owner =
    accounts.filter((account) => account.role === "owner")?.[0]?.email ===
    userProfile.email;

  return (
    <div className="py-14">
      <div className="max-w-[628px] mx-auto">
        <p className="flex-grow-0 flex-shrink-0 w-[635px] text-2xl font-medium text-left text-[#111928]">
          Members
        </p>
        <div className="mt-6">
          <div className="flex items-center py-[7px] border-b border-gray-200">
            <div className="grow px-3 text-xs font-medium text-gray-500">
              ADDRESS
            </div>
            <div className="shrink-0 w-[104px] text-xs font-medium text-gray-500">
              {t("common.members.lastActive")}
            </div>
            <div className="shrink-0 w-[96px] px-3 text-xs font-medium text-gray-500">
              {t("common.members.role")}
            </div>
          </div>
          <div>
            {accounts.map((account) => (
              <div key={account.id} className="flex border-b border-gray-100">
                <div className="grow flex items-center py-2 px-3">
                  <Avatar size={24} className="mr-2" name={account.name} />
                  <div className="">
                    <div className="text-[13px] font-medium text-gray-700 leading-[18px]">
                      {account.name}
                      {account.status === "pending" && (
                        <span className="ml-1 text-xs text-[#DC6803]">
                          {t("common.members.pending")}
                        </span>
                      )}
                      {userProfile.email === account.email && (
                        <span className="text-xs text-gray-500">
                          {t("common.members.you")}
                        </span>
                      )}
                    </div>
                    {/* <div className="text-xs text-gray-500 leading-[18px]">
                      {account.email}
                    </div> */}
                  </div>
                </div>
                <div className="shrink-0 flex items-center w-[104px] py-2 text-[13px] text-gray-700">
                  {dayjs(
                    Number(account.last_login_at || account.created_at) * 1000
                  )
                    .locale("en")
                    .fromNow()}
                </div>
                <div className="shrink-0 w-[96px] flex items-center">
                  {owner && account.role !== "owner" ? (
                    <Operation member={account} onOperate={() => mutate()} />
                  ) : (
                    <div className="px-3 text-[13px] text-gray-700">
                      {RoleMap[account.role] || RoleMap.normal}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
