import { routers } from "../../trpc";
import { publicProcedure } from "../../procedure";
import { createUserHandler } from "./createUser.handler";
import { userInput } from "./createUser.schema";

export const userHandlerRouter = routers({
  createUser: publicProcedure
    .input(userInput)
    .mutation(async ({ input, ctx }) => {
      await createUserHandler({ input, ctx });
    }),
});
