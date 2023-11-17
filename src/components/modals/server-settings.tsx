"use client";

import { ModalContext } from "@/context/createContext";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Check, CheckCheck, Search, XCircle } from "lucide-react";
import { Profile, SUser, SUserRole } from "@prisma/client";
import Avatar from "../ui/avatar";
import ScrollArea from "../ui/scroll-area";
import Dropdown from "../ui/dropdown";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Input from "../ui/input";
import FileUpload from "../file-upload";

interface CustomUser extends SUser {
  user: Profile;
}

const ServerSettingsMembers = () => {
  const { data } = useContext(ModalContext);
  const router = useRouter();
  const [memberData, setMemberData] = useState<Array<CustomUser>>(data.sUsers!);
  const [searchText, setSearchText] = useState<string>();
  const { data: session } = useSession();

  const handleSearch = async () => {
    const response = await axios.get(
      `/api/server/search/members/${data.server?.serverId}?search=${searchText}`
    );
    if (response.data.success) {
      setMemberData(response.data.data);
    }
  };

  const isAdmin =
    data?.sUsers?.find((el) => el.user.userId === session?.user.userId)
      ?.type === "ADMIN";

  useEffect(() => {
    if (searchText) {
      let time = setTimeout(() => {
        handleSearch();
      }, 2000);
      return () => clearTimeout(time);
    } else {
      setMemberData(data.sUsers!);
    }
  }, [searchText]);

  const handleRoleChange = async ({
    sUserId,
    type,
  }: {
    sUserId: string;
    type: SUserRole;
  }) => {
    const response = await axios.post(
      `/api/server/role/${data.server?.serverId}`,
      {
        sUserId,
        type,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      router.refresh();
      await handleSearch();
    }
  };

  return (
    <>
      <div className="flex justify-start items-center relative px-0.5">
        <Search className="absolute left-3 text-zinc-500" size={25} />
        <input
          className="p-4 pl-12 w-[100%] rounded-md bg-[rgb(43,43,47)] outline-none text-zinc-200 channel-search text-base"
          placeholder="Search Members by Username"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <ScrollArea
        content={
          <>
            {memberData?.map((member) => {
              return (
                <tr
                  key={member.user.userId}
                  className="border-b border-opacity-20 dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <td className="p-3 py-4">
                    <Avatar
                      image={member.user.imageUrl}
                      altname={member.user.username}
                      width="w-[35px]"
                      height="h-[35px]"
                    />
                  </td>
                  <td className="p-3 py-4">
                    <p className="">{member.user.displayname}</p>
                  </td>
                  <td className="p-3 py-4">
                    <p>{member.user.email}</p>
                  </td>
                  <td className="p-3 py-4">
                    <p className="rounded-md dark:bg-black p-1 text-xs   text-center">
                      {member.type}
                    </p>
                  </td>
                  <td className="p-3 py-4">
                    <p>{new Date(member.createdAt).toLocaleDateString()}</p>
                  </td>
                  {isAdmin && member.type !== "ADMIN" ? (
                    <td className="p-3 py-4 text-right">
                      <Dropdown
                        trigger={
                          <button className="px-3 py-1 text-sm font-semibold rounded-md dark:bg-gray-400 dark:text-gray-900">
                            <span>Change Role</span>
                          </button>
                        }
                        items={[
                          {
                            content: (
                              <>
                                <div className="flex items-center">
                                  {member.type === "MEMBER" ? (
                                    <>
                                      <Check
                                        size={16}
                                        className="mr-1 text-green-600"
                                      />
                                      <p className="text-green-600">Member</p>
                                    </>
                                  ) : (
                                    <p
                                      className="text-black pl-5"
                                      onClick={() => {}}
                                    >
                                      Member
                                    </p>
                                  )}
                                </div>
                              </>
                            ),
                            handleFunction: () =>
                              handleRoleChange({
                                sUserId: member.sUserId,
                                type: "MEMBER",
                              }),
                            link: "",
                            textColor: "text-black px-1 py-1.5",
                            hoverBackgroundColor: "hover:bg-zinc-100",
                          },
                          {
                            content: (
                              <>
                                <div className="flex items-center">
                                  {member.type === "MODERATOR" ? (
                                    <>
                                      <Check
                                        size={16}
                                        className="mr-1 text-green-600"
                                      />
                                      <p className="text-green-600">
                                        Moderator
                                      </p>
                                    </>
                                  ) : (
                                    <p
                                      className="text-black pl-5"
                                      onClick={() => {}}
                                    >
                                      Moderator
                                    </p>
                                  )}
                                </div>
                              </>
                            ),
                            handleFunction: () =>
                              handleRoleChange({
                                sUserId: member.sUserId,
                                type: "MODERATOR",
                              }),
                            link: "",
                            textColor: "text-black px-1 py-1.5",
                            hoverBackgroundColor: "hover:bg-zinc-100",
                          },
                        ]}
                        contentWidth="w-[120px]"
                        contentColor="bg-white py-1"
                      />
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              );
            })}
          </>
        }
        width="mt-3"
        height="h-[350px]"
        padding={false}
      />
    </>
  );
};

const ServerDetailsForm = () => {
  const { data } = useContext(ModalContext);
  const [file, setFile] = useState<string>(data.server?.imageUrl!);

  const serverNameRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <p className="mb-5 text-mauve11 text-xl leading-normal">Server Details</p>
      <form className="w-[70%] mx-auto">
        <div className="mx-auto mb-3">
          <FileUpload
            value={file}
            onChange={(val) => setFile(val)}
            endpoint="serverImage"
            width="w-[110px]"
            height="h-[110px]"
          />
        </div>
        <div className="mx-auto">
          <Input
            ref={serverNameRef}
            label="Server Name"
            defaultValue={data.server?.name}
          />
        </div>
        <div className="flex justify-end mt-10">
          <button className="p-2 w-[30%] rounded-md border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-800 font-bold">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

// Server Settings Tabs
const ServerSettingsTabs = () => {
  const { data } = useContext(ModalContext);
  const { data: session } = useSession();

  const isAdmin =
    data?.sUsers?.find((el) => el.user.userId === session?.user.userId)
      ?.type === "ADMIN";

  return (
    <>
      <TabsPrimitive.Root
        className="flex flex-col w-[100%] shadow-[0_2px_10px] shadow-blackA2"
        defaultValue="tab1"
      >
        <TabsPrimitive.List
          className="shrink-0 flex border-b border-mauve6"
          aria-label="Manage your account"
        >
          {isAdmin && (
            <TabsPrimitive.Trigger
              className="bg-black text-gray-400 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-white data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-pointer"
              value="tab1"
            >
              Server Details
            </TabsPrimitive.Trigger>
          )}
          <TabsPrimitive.Trigger
            className="bg-black text-gray-400 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-white data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-pointer"
            value="tab2"
          >
            Members
          </TabsPrimitive.Trigger>
        </TabsPrimitive.List>
        {isAdmin && (
          <TabsPrimitive.Content
            className="grow p-5 bg-black rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab1"
          >
            <ServerDetailsForm />
          </TabsPrimitive.Content>
        )}
        <TabsPrimitive.Content
          className="grow p-5 bg-black rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="tab2"
        >
          <ServerSettingsMembers />
        </TabsPrimitive.Content>
      </TabsPrimitive.Root>
    </>
  );
};

const ServerSettingsModal = () => {
  const { type, isOpen, onClose, data } = useContext(ModalContext);
  const isModal = type === "serverSettings" && isOpen;

  return (
    <>
      <Dialog.Root open={isModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[600px] w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-black p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <Dialog.Title className={`text-white m-0 text-[17px] font-medium`}>
              Server Settings - {data?.server?.name}
            </Dialog.Title>
            <Dialog.Description
              className={`text-black mt-[10px] mb-5 text-[15px] leading-normal`}
            ></Dialog.Description>
            <ServerSettingsTabs />
            <Dialog.Close>
              <button
                onClick={() => onClose()}
                className="text-gray-600 hover:text-violet-200 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <XCircle />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default ServerSettingsModal;
