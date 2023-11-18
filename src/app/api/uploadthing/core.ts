import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth-options";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth();
  if (!session?.user.userId) throw new Error("UnAuthorized.");
  return { userId: session?.user.userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
  userImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
