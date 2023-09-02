import { allMergeRouters } from "../trpc";
import { userHandlerRouter } from "./user/_router";

const appRouter = allMergeRouters(userHandlerRouter);

export type AppRouter = typeof appRouter;

export default appRouter;
