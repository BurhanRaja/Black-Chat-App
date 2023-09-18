import * as z from "zod"
import { CompleteUser, userModel, CompleteRoom, roomModel, CompleteDirectMessage, directMessageModel } from "./index"

export const _messageModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  content: z.string(),
  file: z.string(),
  type: z.string(),
  read: z.boolean(),
  reply: z.boolean(),
  replyMessageId: z.string(),
  userId: z.string(),
  roomId: z.string(),
  dMessageId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteMessage extends z.infer<typeof _messageModel> {
  replyMessage?: CompleteMessage | null
  allReplyMessages: CompleteMessage[]
  user: CompleteUser
  room: CompleteRoom
  dMessage: CompleteDirectMessage
}

/**
 * messageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const messageModel: z.ZodSchema<CompleteMessage> = z.lazy(() => _messageModel.extend({
  replyMessage: messageModel.nullish(),
  allReplyMessages: messageModel.array(),
  user: userModel,
  room: roomModel,
  dMessage: directMessageModel,
}))
