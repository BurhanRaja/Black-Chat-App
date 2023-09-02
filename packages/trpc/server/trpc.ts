import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { createContextInner } from "./createContext";
import type { UserFromSession } from "./middleware/sessionMiddleware";

export const tRPCContext = initTRPC
  .context<typeof createContextInner>()
  .create({
    transformer: superjson,
  });

export const middlewares = tRPCContext.middleware;
export const routers = tRPCContext.router;
export const procedures = tRPCContext.procedure;
export const allMergeRouters = tRPCContext.mergeRouters;

export type TRPCUserSession = UserFromSession;
