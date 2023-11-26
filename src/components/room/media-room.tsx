"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

interface MediaRoomProps {
  roomId: string;
  audio: boolean;
  video: boolean;
}

const MediaRoom = ({ roomId, audio, video }: MediaRoomProps) => {
  const { data: session } = useSession();
  const [token, setToken] = useState<string>("");

  const handleGetToken = async (name: string) => {
    try {
      const response = await axios.get(
        `/api/livekit?room=${roomId}&username=${name}`
      );
      setToken(response.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!session?.user.name) return;
    handleGetToken(session.user.name);
  }, [roomId, session?.user]);

  return (
    <div className="h-[100%]">
      <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        connect={true}
        token={token}
        audio={audio}
        video={video}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
};

export default MediaRoom;
