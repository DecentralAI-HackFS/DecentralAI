"use client";
import React, { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { IS_CE_EDITION } from "@/config";
import classNames from "classnames";
import useSWR from "swr";
import Link from "next/link";
import style from "./page.module.css";
// import Tooltip from '@/app/components/base/tooltip/index'
import Toast from "../components/base/toast";
import Button from "@/app/components/base/button";
import {
  login,
  oauth,
  requestLoginMessage,
  walletLogin,
} from "@/service/common";
import { apiPrefix } from "@/config";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import Loading from "../components/base/loading";

const validEmailReg = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/;

type IState = {
  formValid: boolean;
  github: boolean;
  google: boolean;
};

function reducer(state: IState, action: { type: string; payload: any }) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        formValid: true,
      };
    case "login_failed":
      return {
        ...state,
        formValid: true,
      };
    case "github_login":
      return {
        ...state,
        github: true,
      };
    case "github_login_failed":
      return {
        ...state,
        github: false,
      };
    case "google_login":
      return {
        ...state,
        google: true,
      };
    case "google_login_failed":
      return {
        ...state,
        google: false,
      };
    default:
      throw new Error("Unknown action.");
  }
}

const NormalForm = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, {
    formValid: false,
    github: false,
    google: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const handleEmailPasswordLogin = async () => {
    if (!validEmailReg.test(email)) {
      Toast.notify({
        type: "error",
        message: t("login.error.emailInValid"),
      });
      return;
    }
    try {
      setIsLoading(true);
      await login({
        url: "/login",
        body: {
          email,
          password,
          remember_me: true,
        },
      });
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const { data: github, error: github_error } = useSWR(
    state.github
      ? {
          url: "/oauth/login/github",
          // params: {
          //   provider: 'github',
          // },
        }
      : null,
    oauth
  );

  const { data: google, error: google_error } = useSWR(
    state.google
      ? {
          url: "/oauth/login/google",
          // params: {
          //   provider: 'google',
          // },
        }
      : null,
    oauth
  );

  useEffect(() => {
    if (github_error !== undefined)
      dispatch({ type: "github_login_failed", payload: null });
    if (github) window.location.href = github.redirect_url;
  }, [github, github_error]);

  useEffect(() => {
    if (google_error !== undefined)
      dispatch({ type: "google_login_failed", payload: null });
    if (google) window.location.href = google.redirect_url;
  }, [google, google]);

  const [isLoadingWalletLogin,setIsLoadingWalletLogin] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { openConnectModal } = useConnectModal();

  const handleWalletLogin = async () => {
    if (!isConnected) {
      openConnectModal?.()
      return;
    }
    if (!address) {
      Toast.notify({
        type: "error",
        message: t("no address"),
      });
      return;
    }
    if (!chain?.id) {
      Toast.notify({
        type: "error",
        message: t("chainId"),
      });
      return;
    }
    const requestLoginRes = await requestLoginMessage({
      url: "/web3/login/request-message",
      body: { chainId: chain.id, address },
    });
    const signMessageRes = await signMessageAsync({
      message: requestLoginRes.message,
    });
    setIsLoadingWalletLogin(true);
    await walletLogin({
      url: "/web3/login",
      body: {
        message: requestLoginRes.message,
        signature: signMessageRes,
        remember_me: true,
      },
    });
    router.push("/decentral-ai");
  };

  if (isLoadingWalletLogin)
    return <Loading type='area' />

  return (
    <>
      <div className="w-full mx-auto">
        <h2 className="text-3xl font-normal text-gray-900">
          {t("login.pageTitle")}
        </h2>
        <p className="mt-2 text-sm text-gray-600 ">{t("login.welcome")}</p>
      </div>

      <div className="w-full mx-auto mt-8">
        <div className="bg-white ">
          {!IS_CE_EDITION && (
            <div className="flex flex-col gap-3 mt-6">
              <div className="w-full">
                <a href={`${apiPrefix}/oauth/login/github`}>
                  <Button
                    type="default"
                    disabled={isLoading}
                    className="w-full"
                  >
                    <>
                      <span
                        className={classNames(style.githubIcon, "w-5 h-5 mr-2")}
                      />
                      <span className="truncate">{t("login.withGitHub")}</span>
                    </>
                  </Button>
                </a>
              </div>
              <div className="w-full">
                <a href={`${apiPrefix}/oauth/login/google`}>
                  <Button
                    type="default"
                    disabled={isLoading}
                    className="w-full"
                  >
                    <>
                      <span
                        className={classNames(style.googleIcon, "w-5 h-5 mr-2")}
                      />
                      <span className="truncate">{t("login.withGoogle")}</span>
                    </>
                  </Button>
                </a>
              </div>
            </div>
          )}

          {IS_CE_EDITION && (
            <>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleWalletLogin}
              >
                {isConnected ? 'Login': 'Connect Wallet'}
              </button>
              {/* <form className="space-y-6" onSubmit={() => {}}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("login.email")}
                  </label>
                  <div className="mt-1">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={
                        "appearance-none block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="flex items-center justify-between text-sm font-medium text-gray-700"
                  >
                    <span>{t("login.password")}</span>
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className={`appearance-none block w-full px-3 py-2
                  border border-gray-300
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                  rounded-md shadow-sm placeholder-gray-400 sm:text-sm pr-10`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                      >
                        {showPassword ? "👀" : "😝"}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    type="primary"
                    onClick={handleEmailPasswordLogin}
                    disabled={isLoading}
                  >
                    {t("login.signBtn")}
                  </Button>
                </div>
              </form> */}
            </>
          )}
          {/*  agree to our Terms and Privacy Policy. */}
          <div className="block mt-6 text-xs text-gray-600">
            {t("login.tosDesc")}
            &nbsp;
            <Link
              className="text-primary-600"
              target={"_blank"}
              href="https://docs.dify.ai/user-agreement/terms-of-service"
            >
              {t("login.tos")}
            </Link>
            &nbsp;&&nbsp;
            <Link
              className="text-primary-600"
              target={"_blank"}
              href="https://docs.dify.ai/user-agreement/privacy-policy"
            >
              {t("login.pp")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NormalForm;
