"use client";

import { useDeletePost } from "../hooks/useDeletePost";

interface Props {
  postId: string;
}

export default function DeleteButton({ postId }: Props) {
  const { mutate, isPending } = useDeletePost();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bài viết này?",
    );

    if (!confirmDelete) return;

    mutate(postId);
  };

  return (
    <button
      className="bg-red-500/10 hover:bg-red-500/20 px-4 py-2 border border-red-500/30 rounded-lg text-red-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isPending}
      onClick={handleDelete}
      type="button"
    >
      {isPending ? "Đang xóa..." : "Xóa"}
    </button>
  );
}
