import { publicprocedure } from "../../procedure";
import { routers } from "../../trpc";
import { createUserHandler } from "./createUser.handler";
import { userInputValidation } from "./createUser.schema";

export const userRouter = routers({
  createUser: publicprocedure
    .input(userInputValidation)
    .mutation(async ({ input, ctx }) => {
      await createUserHandler({ input });
    }),
});
