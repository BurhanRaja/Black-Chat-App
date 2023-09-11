import React, { FormEvent, useState } from "react";
import Input from "../../../components/forms/Input";
import Select from "../../../components/forms/Select";
import { tRPC } from "trpc/client";
import { ChannelType } from "@prisma/client";

const CreateChannel = () => {
  const [channelName, setChannelName] = useState<string>();
  const [channelType, setChannelType] = useState<ChannelType>();
  const [channelFor, setChannelFor] = useState<number>(-1);

  const { mutateAsync } = tRPC.createChannel.useMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await mutateAsync({
      name: channelName!,
      channelFor: Number(channelFor),
      channelType: channelType,
    });

    console.log(res);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          name="name"
          label="Channel Name"
          value={channelName}
          setValue={(val) => setChannelName(val)}
          labelColor="text-gray-900"
          textColor="text-gray-900"
        />

        <Select
          label="Channel Type"
          value={channelType}
          name="channelType"
          setValue={(val) => setChannelType(val)}
          mappedData={[
            "GAMING",
            "MUSIC",
            "EDUCATION",
            "SCIENCEANDTECH",
            "ENTERTAINMENT",
          ].map((el: ChannelType) => {
            return <option value={el}>{el?.toLowerCase()}</option>;
          })}
        />

        <Select
          label="Channel For"
          value={channelFor}
          name="channelFor"
          setValue={(val) => setChannelFor(val)}
          mappedData={[
            {
              val: 0,
              name: "Friends & Family",
            },
            {
              val: 1,
              name: "Community",
            },
          ].map((el) => {
            return <option value={el.val}>{el.name}</option>;
          })}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateChannel;
