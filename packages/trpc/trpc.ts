import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { createContextInner } from "./createContext";

export const tRPCContext = initTRPC
  .context<typeof createContextInner>()
  .create({
    transformer: superjson,
  });

export const middleware = tRPCContext.middleware;
export const router = tRPCContext.router;
export const procedure = tRPCContext.procedure;
export const mergeRouters = tRPCContext.mergeRouters;
