import { publicprocedure } from "~/trpc/server/procedure";
import { routers } from "~/trpc/trpc";
import { createUserHandler } from "./createUser.handler";
import { userInputValidation } from "./types";

// Add Bio
// Do 2FA
// Verify Email
// Phone Verification

export const userRouter = routers({
  createUser: publicprocedure
    .input(userInputValidation)
    .mutation(async ({ input }) => {
      await createUserHandler({ input });
    }),
});
