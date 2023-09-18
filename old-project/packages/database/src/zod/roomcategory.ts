import * as z from "zod"
import { CompleteChannel, channelModel, CompleteRoom, roomModel } from "./index"

export const _roomCategoryModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  channelId: z.string(),
})

export interface CompleteRoomCategory extends z.infer<typeof _roomCategoryModel> {
  channel: CompleteChannel
  rooms: CompleteRoom[]
}

/**
 * roomCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const roomCategoryModel: z.ZodSchema<CompleteRoomCategory> = z.lazy(() => _roomCategoryModel.extend({
  channel: channelModel,
  rooms: roomModel.array(),
}))
