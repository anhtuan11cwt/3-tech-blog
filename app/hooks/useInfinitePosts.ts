"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../services/post";
import type { Post } from "../types/post";

type PostsResponse = {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
};

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    getNextPageParam: (lastPage: PostsResponse) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      fetchPosts({ pageParam }) as Promise<PostsResponse>,
    queryKey: ["posts"],
  });
};
