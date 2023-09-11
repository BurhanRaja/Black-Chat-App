import z from "zod";
import { _userModel } from "database/src/zod";
import { ChannelType } from "@prisma/client";

type user = typeof _userModel;

// Create User
export const userInputVal = z.object({
  username: z
    .string()
    .min(5, "Min 5 characters are required.")
    .max(25, "Only 25 characters limit."),
  email: z.string().email(),
  password: z
    .string()
    .min(5, "Min 5 characters are required.")
    .max(30, "Only 30 characters limit."),
  country: z
    .string()
    .min(3, "Min 3 characters are required.")
    .max(30, "Only 30 characters limit."),
  phone: z
    .string()
    .min(8, "Min 8 characters are required.")
    .max(15, "Only 15 characters limit."),
});

// Create Channel
type channelType = (typeof ChannelType)[keyof typeof ChannelType];
export const createchannelInputVal = z.object({
  name: z.string().min(5).max(25),
  channelType: z.custom<channelType>(),
  channelFor: z.number(),
});
