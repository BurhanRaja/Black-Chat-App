import "../styles/globals.css";
import type { AppProps } from "next/app";
import { tRPC } from "trpc/client";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default tRPC.withTRPC(MyApp);
