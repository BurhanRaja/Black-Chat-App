import EmailVerifiedPannel from "@/components/email-verified-pannel";
import MainAppLayout from "@/components/main-app-layout";
import ServerPanel from "@/components/server/server-panel";

const Server = () => {
  return (
    <>
      <EmailVerifiedPannel />
      <div className="flex">
        <ServerPanel />
        <MainAppLayout />
      </div>
    </>
  );
};

export default Server;
