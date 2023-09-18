import * as z from "zod"
import { ChannelType } from "@prisma/client"
import { CompleteRoom, roomModel, CompleteChannelUserDetail, channelUserDetailModel, CompleteUsersChannel, usersChannelModel, CompleteRoomCategory, roomCategoryModel } from "./index"

export const _channelModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  name: z.string(),
  image: z.string(),
  inviteCode: z.string(),
  usersChannelId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  channelType: z.nativeEnum(ChannelType),
  channelFor: z.number().int(),
})

export interface CompleteChannel extends z.infer<typeof _channelModel> {
  rooms: CompleteRoom[]
  userDetails: CompleteChannelUserDetail[]
  usersChannel?: CompleteUsersChannel | null
  RoomCategory: CompleteRoomCategory[]
}

/**
 * channelModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const channelModel: z.ZodSchema<CompleteChannel> = z.lazy(() => _channelModel.extend({
  rooms: roomModel.array(),
  userDetails: channelUserDetailModel.array(),
  usersChannel: usersChannelModel.nullish(),
  RoomCategory: roomCategoryModel.array(),
}))