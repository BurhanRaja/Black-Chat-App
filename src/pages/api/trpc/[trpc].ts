import { createNextApiHandler } from "~/trpc/server";
import { appRouter } from "~/trpc/server/router";
import { createContext } from "~/trpc/createContext";

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      console.error("Something went wrong", error);
    }
  },
});
