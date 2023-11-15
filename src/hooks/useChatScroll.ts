"use client";
import { RefObject, useEffect, useState } from "react";

interface ChatScrollProps {
  chatRef: RefObject<HTMLDivElement>;
  bottomRef: RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
}

const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  useEffect(() => {
    const topDiv = chatRef.current;
    const handleScroll = () => {
      let scrollTop = topDiv?.scrollTop;

      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    topDiv?.addEventListener("scroll", handleScroll);

    return () => topDiv?.removeEventListener("scroll", handleScroll);
  }, [chatRef, shouldLoadMore, loadMore]);

  useEffect(() => {
    const topDiv = chatRef.current;
    const bottomDiv = bottomRef.current;

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }

      if (!topDiv) {
        return false;
      }

      let distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomDiv?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }

    // if ()
  }, [chatRef, bottomRef, count, hasInitialized]);
};

export default useChatScroll;
