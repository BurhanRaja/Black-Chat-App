import { createchannelInputVal } from "../../../types";
import { ChannelType } from "@prisma/client";

const createChannel = createchannelInputVal;

export type channelType = (typeof ChannelType)[keyof typeof ChannelType];
export type CreateChannelInput = typeof createChannel._type & {
  channelType: channelType;
};

export const createchannelInput = createchannelInputVal;
