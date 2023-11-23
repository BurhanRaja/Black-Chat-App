"use client";

import { SocketContext } from "@/context/createContext";
import {
  DirectMessageWithProfile,
  MessageWithProfileWithReactionWithReply,
  MessageWithProfile,
} from "@/types";
import { Reaction } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

interface ChatSocketProps {
  queryKey: string;
  addKey: string;
  updateKey: string;
}

const useChatSocket = ({ queryKey, addKey, updateKey }: ChatSocketProps) => {
  const { socket } = useContext(SocketContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }
    // Update Message
    socket.on(
      updateKey,
      (
        message: MessageWithProfileWithReactionWithReply | undefined,
        directMessage: DirectMessageWithProfile | undefined,
        remove: boolean
      ) => {
        queryClient.setQueriesData([queryKey], (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.length === 0) {
            return oldData;
          }

          if (message) {
            if (remove) {
              let newData = oldData.pages?.map((page: any) => {
                return {
                  ...page,
                  items: page.items.filter(
                    (item: MessageWithProfileWithReactionWithReply) =>
                      item.messageId !== message.messageId
                  ),
                };
              });
              return {
                ...oldData,
                pages: newData,
              };
            } else {
              let newData = oldData.pages?.map((page: any) => {
                return {
                  ...page,
                  items: page.items?.map(
                    (item: MessageWithProfileWithReactionWithReply) => {
                      if (item.messageId === message.messageId) {
                        return message;
                      }

                      return item;
                    }
                  ),
                };
              });

              return {
                ...oldData,
                pages: newData,
              };
            }
          }

          if (directMessage) {
            if (remove) {
              let newData = oldData.pages?.map((page: any) => {
                return {
                  ...page,
                  items: page.items.filter(
                    (item: DirectMessageWithProfile) =>
                      item.directMessageId !== directMessage.directMessageId
                  ),
                };
              });
              return {
                ...oldData,
                pages: newData,
              };
            } else {
              let newData = oldData.pages?.map((page: any) => {
                return {
                  ...page,
                  items: page.items?.map((item: DirectMessageWithProfile) => {
                    if (
                      item.directMessageId === directMessage.directMessageId
                    ) {
                      return directMessage;
                    }
                    return item;
                  }),
                };
              });
              return {
                ...oldData,
                pages: newData,
              };
            }
          }
        });
      }
    );
    // Add Message
    socket.on(
      addKey,
      (
        message: MessageWithProfile | undefined,
        directMessage: DirectMessageWithProfile | undefined
      ) => {
        queryClient.setQueryData([queryKey], (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.length === 0) {
            return oldData;
          }

          // Room Message
          if (message) {
            let newData = [...oldData.pages];

            newData[0] = {
              ...newData[0],
              items: [message, ...newData[0].items],
            };

            return {
              ...oldData,
              pages: newData,
            };
          }

          // Direct Message
          if (directMessage) {
            let newData = [...oldData.pages];

            newData[0] = {
              ...newData[0],
              items: [directMessage, ...newData[0].items],
            };

            return {
              ...oldData,
              pages: newData,
            };
          }
        });
      }
    );

    return () => {
      socket.off(updateKey);
      socket.off(addKey);
    };
  }, [queryClient, queryKey, addKey, updateKey, socket]);
};

export default useChatSocket;
