import { userRouter } from "./user/_router";
import { allRouterMerge } from "~/trpc/trpc";

export const appRouter = allRouterMerge(userRouter);

export type AppRouter = typeof appRouter;
