import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "../server/router";
import superjson from "superjson";

const url =
  typeof window !== "undefined"
    ? "/api/trpc"
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/trpc`
    : process.env.NEXT_PUBLIC_WEBAPP_URL
    ? `${process.env.NEXT_PUBLIC_WEBAPP_URL}/api/trpc`
    : `http://localhost:${process.env.PORT}/api/trpc`;

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url,
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 1000,
          },
        },
      },
      transformer: superjson,
    };
  },
  ssr: false,
});

export const transformer = superjson;
