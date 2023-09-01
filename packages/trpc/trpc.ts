import superjson from "superjson";
import { initTRPC } from "@trpc/server";
import { createContextInner } from "./creatContext";

export const trpcContext = initTRPC
  .context<typeof createContextInner>()
  .create({
    transformer: superjson,
  });

export const router = trpcContext.router;
export const mergeRouters = trpcContext.mergeRouters;
export const middleware = trpcContext.middleware;
export const procedure = trpcContext.procedure;
