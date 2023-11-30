import EmailVerifiedPannel from "@/components/email-verified-pannel";
import AppServerLayout from "@/components/app-server-layout";
import ServerPanel from "@/components/server/server-panel";
import "@livekit/components-styles";

const Room = ({ params }: { params: { serverId: string; roomId: string } }) => {
  return (
    <>
      <EmailVerifiedPannel />
      <div className="flex h-full">
        <ServerPanel serverId={params.serverId} />
        <AppServerLayout serverId={params.serverId} roomId={params.roomId} />
      </div>
    </>
  );
};

export default Room;
