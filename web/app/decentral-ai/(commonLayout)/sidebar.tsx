"use client";

import { WorkspaceProvider } from "@/context/workspace-context";
import NavItem from "./navItem";
import WorkspaceNavItems from "./workspaceNavItems";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-[60px] border-r border-gray-200" aria-label="Sidebar">
      <div className="">
        <div className="flex flex-col items-center gap-4 pt-4 pb-7 border-b border-gray-200">
          <NavItem>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M6.00001 3.59998C5.36349 3.59998 4.75304 3.85283 4.30295 4.30292C3.85286 4.75301 3.60001 5.36346 3.60001 5.99998V8.39998C3.60001 9.03649 3.85286 9.64694 4.30295 10.097C4.75304 10.5471 5.36349 10.8 6.00001 10.8H8.40001C9.03653 10.8 9.64697 10.5471 10.0971 10.097C10.5471 9.64694 10.8 9.03649 10.8 8.39998V5.99998C10.8 5.36346 10.5471 4.75301 10.0971 4.30292C9.64697 3.85283 9.03653 3.59998 8.40001 3.59998H6.00001ZM6.00001 13.2C5.36349 13.2 4.75304 13.4528 4.30295 13.9029C3.85286 14.353 3.60001 14.9635 3.60001 15.6V18C3.60001 18.6365 3.85286 19.2469 4.30295 19.697C4.75304 20.1471 5.36349 20.4 6.00001 20.4H8.40001C9.03653 20.4 9.64697 20.1471 10.0971 19.697C10.5471 19.2469 10.8 18.6365 10.8 18V15.6C10.8 14.9635 10.5471 14.353 10.0971 13.9029C9.64697 13.4528 9.03653 13.2 8.40001 13.2H6.00001ZM13.2 5.99998C13.2 5.36346 13.4529 4.75301 13.9029 4.30292C14.353 3.85283 14.9635 3.59998 15.6 3.59998H18C18.6365 3.59998 19.247 3.85283 19.6971 4.30292C20.1471 4.75301 20.4 5.36346 20.4 5.99998V8.39998C20.4 9.03649 20.1471 9.64694 19.6971 10.097C19.247 10.5471 18.6365 10.8 18 10.8H15.6C14.9635 10.8 14.353 10.5471 13.9029 10.097C13.4529 9.64694 13.2 9.03649 13.2 8.39998V5.99998ZM13.2 15.6C13.2 14.9635 13.4529 14.353 13.9029 13.9029C14.353 13.4528 14.9635 13.2 15.6 13.2H18C18.6365 13.2 19.247 13.4528 19.6971 13.9029C20.1471 14.353 20.4 14.9635 20.4 15.6V18C20.4 18.6365 20.1471 19.2469 19.6971 19.697C19.247 20.1471 18.6365 20.4 18 20.4H15.6C14.9635 20.4 14.353 20.1471 13.9029 19.697C13.4529 19.2469 13.2 18.6365 13.2 18V15.6Z"
                fill="#4B5563"
              />
            </svg>
          </NavItem>

          <NavItem>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
              preserveAspectRatio="xMidYMid meet"
            >
              <g clip-path="url(#clip0_803_23580)">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM6.5 17.5L14.01 14.01L17.5 6.5L9.99 9.99L6.5 17.5ZM12 10.9C12.61 10.9 13.1 11.39 13.1 12C13.1 12.61 12.61 13.1 12 13.1C11.39 13.1 10.9 12.61 10.9 12C10.9 11.39 11.39 10.9 12 10.9Z"
                  fill="#4B5563"
                />
              </g>
              <defs>
                <clipPath id="clip0_803_23580">
                  <rect width={24} height={24} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </NavItem>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center gap-4 pt-4 pb-7">
          <WorkspaceProvider>
            <WorkspaceNavItems />
          </WorkspaceProvider>
          <Link href="/decentral-ai/dao/create">
            <NavItem>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M12 6.79999V12.8M12 12.8V18.8M12 12.8H18M12 12.8H6"
                  stroke="#4B5563"
                  stroke-width={2}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </NavItem>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
