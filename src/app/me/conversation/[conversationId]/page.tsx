import EmailVerifiedPannel from "@/components/email-verified-pannel";
import ServerPanel from "@/components/server/server-panel";
import AppDMLayout from "@/components/app-directmessage-layout";

const DMPage = ({ params }: { params: { conversationId: string } }) => {
  return (
    <>
      <EmailVerifiedPannel />
      <div className="flex">
        <ServerPanel />
        <AppDMLayout conversationId={params.conversationId} />
      </div>
    </>
  );
};

export default DMPage;
