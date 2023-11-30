import EmailVerifiedPannel from "@/components/email-verified-pannel";
import ServerPanel from "@/components/server/server-panel";
import { ReactNode } from "react";

const ConversationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <EmailVerifiedPannel />
      <div className="flex">
        <ServerPanel serverId={""} />
        {children}
      </div>
    </>
  );
};

export default ConversationLayout;
