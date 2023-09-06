import { prisma } from "database/src/client";
import { TRPCError } from "@trpc/server";

// Input :-
/*
name
userid
*/

/*
Process :-

Check if it has User's Channel or not
if yes then continue and not then

create a User's Channel
userId: userid
uniqueId

Create a Channel
name
userId: userid
invitecode
userchannelId

Create a ChannelUserDetails
userId: userid
accessRole: ADMIN
join_type: 0
channelId

Create a General Room
uniqueId
name
channelId
accessRoles 

*/

export const createChannel = async () => {};
