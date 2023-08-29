import * as z from "zod"
import { CompleteUser, relatedUserModel, CompleteRoom, relatedRoomModel, CompleteIndividualChat, relatedIndividualChatModel } from "./index"

export const messageModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  message: z.string(),
  file: z.string(),
  type: z.string(),
  read: z.boolean(),
  reply: z.boolean(),
  replyMessage: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  roomId: z.string(),
  individualChatId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteMessage extends z.infer<typeof messageModel> {
  sender: CompleteUser
  reciever: CompleteUser
  room: CompleteRoom
  individualChat: CompleteIndividualChat
}

/**
 * relatedMessageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMessageModel: z.ZodSchema<CompleteMessage> = z.lazy(() => messageModel.extend({
  sender: relatedUserModel,
  reciever: relatedUserModel,
  room: relatedRoomModel,
  individualChat: relatedIndividualChatModel,
}))
