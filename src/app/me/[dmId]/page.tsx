import EmailVerifiedPannel from "@/components/email-verified-pannel";
import ServerPanel from "@/components/server/server-panel";
import AppDMLayout from "@/components/app-directmessage-layout";
import ChatArea from "@/components/chat/chat-messages";

const DMPage = () => {
  return (
    <>
      <EmailVerifiedPannel />
      <div className="flex">
        <ServerPanel />
        <AppDMLayout chatarea={<ChatArea />} />
      </div>
    </>
  );
};

export default DMPage;
