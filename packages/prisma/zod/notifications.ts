import * as z from "zod"
import { CompleteUser, userModel } from "./index"

export const _notificationsModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  read: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteNotifications extends z.infer<typeof _notificationsModel> {
  user: CompleteUser
}

/**
 * notificationsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const notificationsModel: z.ZodSchema<CompleteNotifications> = z.lazy(() => _notificationsModel.extend({
  user: userModel,
}))
