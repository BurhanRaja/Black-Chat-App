import EmailVerifiedPannel from "@/components/email-verified-pannel";
import ServerPanel from "@/components/server/server-panel";
import AppDMLayout from "@/components/app-directmessage-layout";
import { ChatAreaImageItem } from "@/components/chat/chat-area";

const Home = () => {
  return (
    <>
      <EmailVerifiedPannel />
      <div className="flex">
        <ServerPanel />
        <AppDMLayout chatarea={<ChatAreaImageItem />} />
      </div>
    </>
  );
};

export default Home;