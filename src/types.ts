import z, { TypeOf } from "zod";
import {
  DirectMessage,
  Message,
  Profile,
  Reaction,
  RoomType,
  SUser,
  UserReaction,
} from "@prisma/client";
import { NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";

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
  gender: z.number(),
});
export type CreateProfile = z.infer<typeof createProfile>;

// Resend Email
export const resendEmail = z.object({
  userId: z.string(),
  email: z.string().email(),
});
export type ResendEmail = z.infer<typeof resendEmail>;

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

// Response Server IO
export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

// Message With Profile with Reaction
export type MessageWithProfileWithReactionWithReply = Message & {
  user: SUser & {
    user: Profile;
  };
  replyuser: SUser & {
    user: Profile;
  };
  reactions: Array<Reaction & { UserReaction: UserReaction }>;
  replymessage: Message & {
    user: SUser & {
      user: Profile;
    };
  };
};

// Message With Profile
export type MessageWithProfile = Message & {
  user: SUser & {
    user: Profile;
  };
  replyuser: SUser & {
    user: Profile;
  };
  replymessage: Message & {
    user: SUser & {
      user: Profile;
    };
  };
};

export type DirectMessageWithProfileWithReactionWithReply = DirectMessage & {
  user: Profile;
  replyuser: Profile;
  replymessage: DirectMessage & {
    user: Profile;
  };
  reactions: Array<Reaction & { UserReaction: UserReaction }>;
};

export type DirectMessageWithProfile = DirectMessage & {
  user: Profile;
  replyuser: SUser & {
    user: Profile;
  };
  replymessage: Message & {
    user: SUser & {
      user: Profile;
    };
  };
};
