"use client";
import Image from "next/image";
import ChatItem from "./chat-item";
import { usePathname } from "next/navigation";
import { Fragment, useRef } from "react";
import ChatWelcome from "./chat-welcome";
import useChatQuery from "@/hooks/useChatQuery";
import useChatScroll from "@/hooks/useChatScroll";
import { Loader2, ServerCrash } from "lucide-react";

export const ChatAreaImageItem = () => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`flex items-center justify-center h-[93.3vh] bg-zinc-700 ${
          pathname === "/me" ? "w-full" : "w-[80%]"
        }`}
      >
        <div className="flex flex-col justify-between items-center">
          <Image
            src={"/welcome-page.png"}
            alt="welcome"
            width={350}
            height={500}
          />
          <h2 className="text-5xl font-assistant font-extrabold">Blackchat</h2>
        </div>
      </div>
    </>
  );
};

interface ChatAreaProps {
  queryKey: string;
  apiUrl: string;
  paramKey: string;
  paramValue: string;
}

const ChatMessages = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatAreaProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });

  useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
    count: data?.pages?.[0]?.items.length ?? 0,
  });

  if (status === "loading") {
    return (
      <>
        <div className="flex flex-col flex-1 justify-center items-center">
          <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Loading messages...
          </p>
        </div>
      </>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div
      ref={chatRef}
      className="flex-1 flex flex-col py-4 bg-zinc-700 overflow-y-auto h-[585px]"
    >
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={"room"} name={"general"} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((el, index) => {
          return (
            <Fragment key={index}>
              {el.items?.map((el: any) => {
                return (
                  <ChatItem
                    key={el.messageId}
                    message={el.content}
                    file={el.file!}
                    fileType={el.file!.split(".").pop()}
                    username={el.user.user.displayname}
                    createdAt={new Date(el.createdAt).toLocaleString()}
                    userImage={el.user.user.imageUrl}
                    type={el.user.type}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
