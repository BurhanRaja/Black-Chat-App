import "../styles/globals.css";
import type { AppProps } from "next/app";
import { tRPC } from "trpc/client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default tRPC.withTRPC(MyApp);
