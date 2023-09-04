import { initTRPC } from "@trpc/server";
import { createInnerContext } from "./createContext";
import superjson from "superjson";

export const tRPCContext = initTRPC
  .context<typeof createInnerContext>()
  .create({
    transformer: superjson,
  });

export const middlewares = tRPCContext.middleware;
export const procedures = tRPCContext.procedure;
export const routers = tRPCContext.router;
export const allRouterMerge = tRPCContext.mergeRouters;
