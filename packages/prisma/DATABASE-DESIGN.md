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

Channel = {
    id,
    name,
    rooms,
    users,
    uniqueid,
    invitecode,
    public
}

Room = {
    id,
    channelid,
    name,
    access_roles,
    users,
    roomchatid
}

RoomChat = {
    id,
    message,
    replymessageid,
    roomid,
    userid,
}

IndividualChat = {

}
```
