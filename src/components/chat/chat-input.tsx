"use client";
import { FileIcon, PlusCircle, X, XCircle } from "lucide-react";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";
import Dropdown from "../ui/dropdown";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import MessageFileUpload from "../modals/message-file";
import Avatar from "../ui/avatar";
import { ModalContext } from "@/context/createContext";

const FileUpload = () => {
  const { onOpen } = useContext(ModalContext);
  return (
    <>
      <Dropdown
        trigger={
          <PlusCircle
            className="text-zinc-500 hover:text-zinc-300 cursor-pointer"
            size={25}
          />
        }
        items={[
          {
            content: "Upload File",
            link: "",
            icon: <FaUpload className="text-lg" />,
            textColor: "text-white hover:text-gray-100",
            hoverBackgroundColor: "hover:bg-gray-800",
            handleFunction: () => onOpen("messageFile", {}),
          },
        ]}
        contentWidth="w-[150px] mb-3"
        contentColor="bg-gray-900"
        side="top"
        align="start"
        alignOffset={-19}
      />
    </>
  );
};

interface ChatInputProps {
  serverId: string;
  chatId: string;
}

const ChatInput = ({ serverId, chatId }: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const { onClose } = useContext(ModalContext);

  const handleMessage = async () => {
    if (!inputRef.current?.value && !file) return;

    let data = {
      content: inputRef?.current?.value ? inputRef.current.value : "",
      fileUrl: file,
    };
    const response = await axios.post(
      `/api/socket/messages?serverId=${serverId}&roomId=${chatId}&reply=no`,
      data
    );

    setFile("");
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (file) {
      setFileType(file.split(".").pop()!);
      onClose();
    }
  }, [file]);

  return (
    <>
      <MessageFileUpload file={file} setFile={(val) => setFile(val)} />
      <div className="flex items-center relative justify-center bg-zinc-800 w-[90%] mx-auto rounded-sm px-2 p-1">
        {/* <div className="absolute flex items-center justify-between left-0 top-[-30px] w-[100%] p-1.5 px-2 rounded-t-md text-sm bg-black">
          <p>
            Replying to <span className="text-orange-500">Rahul</span>
          </p>
          <button>
            <XCircle size={18} className="text-zinc-400 hover:text-zinc-200" />
          </button>
        </div> */}
        {file && fileType !== "pdf" && (
          <div className="absolute flex items-center justify-between left-0 top-[-160px] w-[100%] p-1.5 px-2 rounded-t-md text-sm bg-zinc-900">
            <div className="flex justify-center w-[20%]">
              <div className="relative w-[90%]">
                <Avatar
                  image={file}
                  radius="small"
                  altname="uploaded file"
                  width={"w-[150px]"}
                  height={"h-[150px]"}
                />
                <button
                  className="absolute bg-gray-200 hover:bg-gray-100 rounded-full p-1 right-1"
                  onClick={() => setFile("")}
                >
                  <X size={15} className="text-red-500 font-extrabold" />
                </button>
              </div>
            </div>
          </div>
        )}

        {file && fileType === "pdf" && (
          <div className="absolute flex items-center justify-between left-0 top-[-30px] w-[100%] p-1.5 px-2 rounded-t-md text-sm bg-black">
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                {file}
              </a>
              <button
                onClick={() => setFile("")}
                className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <FileUpload />
        <input
          type="text"
          ref={inputRef}
          className="w-[90%] p-2.5 mx-2 outline-none bg-zinc-800 chat-input"
          placeholder="Write a Message"
          onKeyDown={(e) => {
            e.key === "Enter" ? handleMessage() : "";
          }}
        />
        <BsFillEmojiLaughingFill className="text-zinc-500 hover:text-yellow-500 rounded-3xl text-2xl cursor-pointer" />
      </div>
    </>
  );
};

export default ChatInput;
