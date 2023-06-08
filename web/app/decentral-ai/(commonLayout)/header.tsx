"use client";
import { Navbar } from "flowbite-react";

const Header = () => {
  return (
    <nav className="bg-gray-50 h-[52px] dark:bg-gray-800 dark:border-gray-700 border-b border-gray-200 box-border">
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
      </div>
    </nav>
  );
};

export default Header;
