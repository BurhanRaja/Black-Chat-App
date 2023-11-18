import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { createConversation, findConversation } from "@/lib/conversation";

const CreateOrFindConversation = async ({
  params,
}: {
  params: { memberId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/auth/signin");
  }

  let conversation =
    (await findConversation(profile.userId, params.memberId)) ||
    (await findConversation(params.memberId, profile.userId));

  if (!conversation) {
    conversation = await createConversation(profile.userId, params.memberId);
  }

  return redirect(`/me/conversation/${conversation?.id}`);
};

export default CreateOrFindConversation;
