// Create Channel
// Update Channle Info
// Delete Channel
// Provide Channel Invite Code
// Get All Channel for User
// Get Single Channel and All the Rooms

import { authedProcedure } from "../../procedure";
import { routers } from "../../trpc";
import { createChannel } from "./createChannel.handler";
import { createchannelInput } from "./createChannel.schema";

export const channelRouter = routers({
  // createChannel
  createChannel: authedProcedure
    .input(createchannelInput).mutation(async ({ input, ctx }) => {
      return await createChannel({ input, ctx });
    }),
});
