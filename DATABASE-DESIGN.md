## Postgresql

```
User = {
    id,
    username,
    email,
    password,
    uniqueId,
    emailVerified,
    createdAt,
    updatedAt,
}

ChannelUserDetail = {
    user_id,
    access_role,
    join_type,
    createdAt,
    updatedAt,
}

Channel = {
    id,
    uniqueId,
    name,
    rooms: Rooms[],
    users: ChannelUser[],
    invitecode,
    public,
    createdAt,
    updatedAt,
}

Room = {
    id,
    uniqueId,
    channelId,
    name,
    access_roles,
    roomchatId,
    createdAt,
    updatedAt,
}

VideoChat = {
    id,
    participants,
    agenda,
    channelId,
    schedule,
    createdAt,
    updatedAt,
    sessionTime,
    sessionExpireTime
}

Friends = {
    id,
    sender: user_id,
    receiver: user_id,
    status,
}

Message = {
    id,
    message,
    messageId,
    reply,
    type: "mp4/text",
    read: boolean,
    user_id,
    to,
    createdAt,
    updatedAt,
}

Notifications = {

}

Roles = {

}

Permissions = {

}

```

## MongoDB

```
RoomChat = {
    id,
    roomId,
    channelId,
    messages: [
        {
            id,
            messageId,
        }
    ],
    createdAt,
    updatedAt,
}

IndividualChat = {
    id,
    uniqueId,
    from: user_id,
    to: user_id,
    messages: [
        {
            id,
            messageId,
        }
    ],
    createdAt,
    updatedAt,
}
```