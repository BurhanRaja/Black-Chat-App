import * as z from "zod"
import { CompleteUser, userModel, CompleteRoom, roomModel, CompleteDirectMessage, directMessageModel } from "./index"

export const _messageModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  message: z.string(),
  file: z.string(),
  type: z.string(),
  read: z.boolean(),
  reply: z.boolean(),
  replyMessage: z.string(),
  userId: z.string(),
  replyUserId: z.string(),
  roomId: z.string(),
  dMessageId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteMessage extends z.infer<typeof _messageModel> {
  user: CompleteUser
  replyUser: CompleteUser
  room: CompleteRoom
  dMessage: CompleteDirectMessage
}

/**
 * messageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const messageModel: z.ZodSchema<CompleteMessage> = z.lazy(() => _messageModel.extend({
  user: userModel,
  replyUser: userModel,
  room: roomModel,
  dMessage: directMessageModel,
}))
