import { userRouter } from "./user/_router";
import { channelRouter } from "./channel/_router";
import { allRouterMerge } from "../trpc";

export const appRouter = allRouterMerge(userRouter, channelRouter);

export type AppRouter = typeof appRouter;
