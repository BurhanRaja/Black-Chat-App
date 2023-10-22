import { useSession } from "next-auth/react";
import { prisma } from "@/db/client";

const currentProfile = async () => {
  const { data } = useSession();

  if (!data?.user) {
    return null;
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: data?.user?.userId,
    },
  });

  return profile;
};

export default currentProfile;
