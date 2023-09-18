import * as z from "zod"
import { CompleteUser, userModel } from "./index"

export const _sessionModel = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
})

export interface CompleteSession extends z.infer<typeof _sessionModel> {
  user: CompleteUser
}

/**
 * sessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const sessionModel: z.ZodSchema<CompleteSession> = z.lazy(() => _sessionModel.extend({
  user: userModel,
}))
