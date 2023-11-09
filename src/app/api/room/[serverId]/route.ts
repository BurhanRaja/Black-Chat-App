import { NextRequest } from "next/server";

interface GetServerRoomsParams {
  params: {
    serverId: string;
  };
}

export async function GET(req: NextRequest, {params}: GetServerRoomsParams) {
        
}
