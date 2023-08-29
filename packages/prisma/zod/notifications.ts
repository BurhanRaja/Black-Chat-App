import * as z from "zod"
import { CompleteUser, relatedUserModel } from "./index"

export const notificationsModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  read: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteNotifications extends z.infer<typeof notificationsModel> {
  user: CompleteUser
}

/**
 * relatedNotificationsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedNotificationsModel: z.ZodSchema<CompleteNotifications> = z.lazy(() => notificationsModel.extend({
  user: relatedUserModel,
}))
