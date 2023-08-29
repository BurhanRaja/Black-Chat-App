import * as z from "zod"
import { CompleteMessage, relatedMessageModel } from "./index"

export const individualChatModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteIndividualChat extends z.infer<typeof individualChatModel> {
  Message: CompleteMessage[]
}

/**
 * relatedIndividualChatModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedIndividualChatModel: z.ZodSchema<CompleteIndividualChat> = z.lazy(() => individualChatModel.extend({
  Message: relatedMessageModel.array(),
}))
