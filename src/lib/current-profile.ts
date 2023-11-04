import { prisma } from "@/db/client";
import { auth } from "./auth-options";

const currentProfile = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session?.user?.userId,
    },
  });

  return profile;
};

export default currentProfile;
