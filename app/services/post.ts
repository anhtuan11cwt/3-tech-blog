import axios from "axios";

export const fetchPosts = async ({
  pageParam = null,
}: {
  pageParam?: string | null;
}) => {
  const params = new URLSearchParams();
  if (pageParam) {
    params.set("cursor", pageParam);
  }
  params.set("limit", "6");

  const res = await fetch(`/api/post?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Lỗi khi lấy danh sách bài viết");
  }

  return res.json();
};

export const deletePost = async (postId: string) => {
  const res = await axios.delete(`/api/post/${postId}`);
  return res.data;
};
