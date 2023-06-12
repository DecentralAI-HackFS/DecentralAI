"use client";

import { logout } from "@/service/common";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter();
  const onLogout = async () => {
    await logout({
      url: "/logout",
      params: {},
    });
    router.push("/signin");
  };

  return (
    <nav className="bg-gray-50 h-16 dark:bg-gray-800 dark:border-gray-700 border-b border-gray-200 box-border">
      <div className="flex flex-wrap items-center justify-between mx-auto p-3">
        <a href="#" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            DecentralAI
          </span>
        </a>
        <div className="flex gap-4">
          <button
            type="button"
            className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={onLogout}
          >
            Logout
          </button>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
