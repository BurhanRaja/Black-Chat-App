"use client";
import Image from "next/image";
import ChatItemMessage from "./chat-item-message";
import { usePathname } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import ChatWelcome from "./chat-welcome";
import useChatQuery from "@/hooks/useChatQuery";
import useChatScroll from "@/hooks/useChatScroll";
import { Loader2, ServerCrash } from "lucide-react";
import useChatSocket from "@/hooks/useChatSocket";
import {
  DirectMessageWithProfileWithReactionWithReply,
  MessageWithProfileWithReactionWithReply,
} from "@/types";
import { Profile, SUser } from "@prisma/client";
import randomcolor from "randomcolor";

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

interface ChatMessagesProps {
  chatId?: string;
  serverId?: string;
  conversationId?: string;
  memberServer?: {
    user: Profile;
  } & SUser;
  memberConversation?: Profile;
  apiUrl: string;
  paramKey: string;
  paramValue: string;
  welcomeType: string;
  welcomeName: string;
}

const ChatMessages = ({
  chatId,
  serverId,
  conversationId,
  apiUrl,
  paramKey,
  paramValue,
  memberServer,
  memberConversation,
  welcomeType,
  welcomeName,
}: ChatMessagesProps) => {
  let queryKey = "";
  let addKey = "";
  let updateKey = "";

  if (chatId) {
    queryKey = `chat:${chatId}`;
    addKey = `chat:${chatId}:message`;
    updateKey = `chat:${chatId}:message:update`;
  }

  if (conversationId) {
    queryKey = `chat:${conversationId}`;
    addKey = `chat:${conversationId}:message`;
    updateKey = `chat:${conversationId}:message:update`;
  }

  const bottomRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });
  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
    count: data?.pages?.[0]?.items.length ?? 0,
  });

  let userColor: Array<{ color: string; userId: string }> = [];

  if (status === "loading") {
    return (
      <>
        <div className="flex flex-col flex-1 justify-start h-[585px] bg-zinc-700">
          <div className="p-4 max-w-lg w-full ">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-zinc-500 h-14 w-14"></div>
              <div className="flex-1 space-y-6 py-1 ">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-2 bg-zinc-500 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-zinc-500 rounded"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-zinc-500 rounded col-span-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 max-w-lg w-full ">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-zinc-500 h-14 w-14"></div>
              <div className="flex-1 space-y-6 py-1 ">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-2 bg-zinc-500 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-zinc-500 rounded"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-zinc-500 rounded col-span-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 max-w-lg w-full ">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-zinc-500 h-14 w-14"></div>
              <div className="flex-1 space-y-6 py-1 ">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-2 bg-zinc-500 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-zinc-500 rounded"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-zinc-500 rounded col-span-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 max-w-lg w-full ">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-zinc-500 h-14 w-14"></div>
              <div className="flex-1 space-y-6 py-1 ">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-2 bg-zinc-500 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-zinc-500 h-52 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
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
      {!hasNextPage && <ChatWelcome type={welcomeType} name={welcomeName} />}
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
        {!conversationId && chatId && serverId
          ? data?.pages?.map((el, index) => {
              return (
                <Fragment key={index}>
                  {el?.items?.map(
                    (el: MessageWithProfileWithReactionWithReply) => {
                      let colorCheck = userColor?.find((elColor) =>
                        !el?.isReply
                          ? elColor.userId === el?.user?.userId
                          : elColor.userId === el?.replyuser?.userId
                      );
                      let randomColor = "";
                      if (!colorCheck) {
                        randomColor = randomcolor({ luminosity: "light" });
                        if (!el?.isReply) {
                          userColor.push({
                            userId: el?.user?.userId,
                            color: randomColor,
                          });
                        } else {
                          userColor.push({
                            userId: el?.replyuser?.userId,
                            color: randomColor,
                          });
                        }
                      }
                      return (
                        <ChatItemMessage
                          color={colorCheck ? colorCheck.color : randomColor}
                          chatId={chatId}
                          serverId={serverId}
                          messageId={el?.messageId}
                          currmemberServer={memberServer}
                          key={el?.messageId}
                          message={el?.content!}
                          file={el?.file!}
                          fileType={el?.file ? el?.file?.split(".").pop() : ""}
                          username={
                            el?.isReply
                              ? el?.replyuser?.user?.displayname
                              : el?.user?.user?.displayname
                          }
                          createdAt={new Date(el?.createdAt).toLocaleString()}
                          userImage={
                            el?.isReply
                              ? el?.replyuser?.user?.imageUrl
                              : el?.user?.user?.imageUrl
                          }
                          deleted={el?.isDelete}
                          reply={el?.isReply}
                          messageUserId={
                            el?.isReply
                              ? el?.replyuser?.userId
                              : el?.user?.userId
                          }
                          reactions={el?.reactions!}
                          replyMessage={
                            el?.isReply ? el?.replymessage : undefined
                          }
                          repliedUsername={
                            el?.isReply
                              ? el?.replymessage?.user?.user?.displayname!
                              : ""
                          }
                        />
                      );
                    }
                  )}
                </Fragment>
              );
            })
          : data?.pages?.map((el, index) => {
              return (
                <Fragment key={index}>
                  {el?.items?.map(
                    (el: DirectMessageWithProfileWithReactionWithReply) => {
                      let colorCheck = userColor?.find((elColor) =>
                        el?.isReply
                          ? elColor.userId === el?.user?.userId
                          : elColor.userId === el?.replyuser?.userId
                      );
                      let randomColor = "";
                      if (!colorCheck) {
                        randomColor = randomcolor({ luminosity: "light" });
                        userColor.push({
                          userId: el?.user?.userId,
                          color: randomColor,
                        });
                      }
                      return (
                        <ChatItemMessage
                          color={colorCheck ? colorCheck.color : randomColor}
                          conversationId={conversationId!}
                          messageId={el?.directMessageId}
                          currmemberConversation={memberConversation}
                          key={el?.directMessageId}
                          message={el?.content!}
                          file={el?.file!}
                          fileType={el?.file ? el?.file?.split(".").pop() : ""}
                          username={
                            el?.isReply
                              ? el?.replyuser?.displayname
                              : el?.user?.displayname
                          }
                          createdAt={new Date(el?.createdAt).toLocaleString()}
                          userImage={
                            el?.isReply
                              ? el?.replyuser?.imageUrl
                              : el?.user?.imageUrl
                          }
                          deleted={el?.isDelete}
                          reply={el?.isReply}
                          reactions={el?.reactions}
                          messageUserId={
                            el?.isReply
                              ? el?.replyuser?.userId
                              : el?.user?.userId
                          }
                          replyDirectMessage={
                            el?.isReply ? el?.replymessage : undefined
                          }
                          repliedUsername={
                            el?.isReply
                              ? el?.replymessage?.user?.displayname!
                              : ""
                          }
                        />
                      );
                    }
                  )}
                </Fragment>
              );
            })}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
