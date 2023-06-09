import I18nServer from "./components/i18n-server";
import { getLocaleOnServer } from "@/i18n/server";
import "./styles/globals.css";
import "./styles/markdown.scss";
import '@rainbow-me/rainbowkit/styles.css';
import LitProvider from "./litProvider";
import { ChainProvider } from "./chainProvider";

export const metadata = {
  title: "Dify",
};

const LocaleLayout = ({ children }: { children: React.ReactNode }) => {
  const locale = getLocaleOnServer();
  return (
    <html lang={locale ?? "en"} className="h-full">
      <body
        className="h-full"
        data-api-prefix={process.env.NEXT_PUBLIC_API_PREFIX}
        data-pubic-api-prefix={process.env.NEXT_PUBLIC_PUBLIC_API_PREFIX}
        data-public-edition={process.env.NEXT_PUBLIC_EDITION}
      >
        {/* @ts-expect-error Async Server Component */}
        <I18nServer locale={locale}>
          <ChainProvider>{children}</ChainProvider>
        </I18nServer>
        <LitProvider />
      </body>
    </html>
  );
};

export default LocaleLayout;
