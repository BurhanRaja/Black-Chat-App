import { ChannelType } from "@prisma/client";
import z from "zod";

// Create Channel
type channelTypeInput = (typeof ChannelType)[keyof typeof ChannelType];
export const createchannelInputVal = z.object({
  name: z.string().min(5).max(25),
  channelType: z.custom<channelTypeInput>(),
  channelFor: z.number(),
});

const createChannel = createchannelInputVal;

export type channelType = (typeof ChannelType)[keyof typeof ChannelType];
export type CreateChannelInput = typeof createChannel._type & {
  channelType: channelType;
};

export const createchannelInput = createchannelInputVal;
