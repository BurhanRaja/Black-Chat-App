import z from "zod";
import { RoomType } from "@prisma/client";

// Create Profile
export const createProfile = z.object({
  email: z.string().email("This is not a valid email."),
  username: z
    .string()
    .min(5)
    .max(20)
    .regex(/^[a-zA-Z0-9]/)
    .toLowerCase(),
  password: z
    .string()
    .min(5)
    .max(20)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),
  gender: z.string().toLowerCase(),
});
export type CreateProfile = z.infer<typeof createProfile>;

// Edit Profile
export const editProfile = z.object({
  imageUrl: z.string().url(),
  email: z.string().email("This is not a valid email."),
  username: z
    .string()
    .min(5)
    .max(20)
    .regex(/^[a-zA-Z0-9]/),
  bio: z.string().max(160),
});
export type EditProfile = z.infer<typeof editProfile>;

// Create Server
export const createServer = z.object({
  name: z.string().min(3).max(40),
  imageUrl: z.string().url(),
});
export type CreateServer = z.infer<typeof createServer>;

// Create Room
type roomType = (typeof RoomType)[keyof typeof RoomType];
export const createRoom = z.object({
  name: z.string().min(3).max(25),
  type: z.custom<roomType>(),
  serverId: z.string(),
  isPrivate: z.boolean(),
});
export type CreateRoom = z.infer<typeof createRoom>;
