import EmailVerifiedPannel from "@/components/email-verified-pannel";
import ServerPanel from "@/components/server/server-panel";
import AppDMLayout from "@/components/app-directmessage-layout";

const DMPage = () => {
  return (
    <>
      <EmailVerifiedPannel />
      <div className="flex">
        <ServerPanel />
        <AppDMLayout />
      </div>
    </>
  );
};

export default DMPage;
