"use client";
import { useEffect } from "react";
import * as LitJsSdk from "@lit-protocol/lit-node-client";

const LitProvider = () => {
  useEffect(() => {
    const initLit = async () => {
      const client = new LitJsSdk.LitNodeClient({});
      await client.connect();
      // @ts-expect-error
      window.litNodeClient = client;
    };
    initLit();
  }, []);
  return <></>;
};

export default LitProvider;
