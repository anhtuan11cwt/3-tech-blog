"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deletePost } from "../services/post";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deletePost,
    onError: () => {
      toast.error("Xóa bài viết thất bại");
    },
    onSuccess: () => {
      toast.success("Xóa bài viết thành công");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/articles");
    },
  });
};
