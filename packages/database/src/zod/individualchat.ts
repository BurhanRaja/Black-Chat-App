import * as z from "zod"
import { CompleteMessage, messageModel } from "./index"

export const _individualChatModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteIndividualChat extends z.infer<typeof _individualChatModel> {
  Message: CompleteMessage[]
}

/**
 * individualChatModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const individualChatModel: z.ZodSchema<CompleteIndividualChat> = z.lazy(() => _individualChatModel.extend({
  Message: messageModel.array(),
}))
