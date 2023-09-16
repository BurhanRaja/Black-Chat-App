import { initTRPC } from "@trpc/server";
import { createInnerContext } from "./createContext";
import superjson from "superjson";
import { ZodError } from "zod";

export const tRPCContext = initTRPC
  .context<typeof createInnerContext>()
  .create({
    transformer: superjson,
    errorFormatter(opts) {
      const { shape, error } = opts;
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === "BAD_REQUEST" && error.cause instanceof ZodError
              ? error.cause.flatten()
              : null,
        },
      };
    },
  });

export const middlewares = tRPCContext.middleware;
export const procedures = tRPCContext.procedure;
export const routers = tRPCContext.router;
export const allRouterMerge = tRPCContext.mergeRouters;
