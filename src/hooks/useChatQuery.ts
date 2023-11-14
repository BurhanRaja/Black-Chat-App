"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: string;
  paramValue: string;
}

const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const fetchMessages = async ({ pageParam = undefined }) => {
    const response = await axios.get(
      `${apiUrl}?${paramKey}=${paramValue}&cursor=${pageParam ? pageParam : ""}`
    );
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: false,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useChatQuery;
