"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ContainerLayout from "../../../layouts/ContainerLayout";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

function EditPageSkeleton() {
  return (
    <ContainerLayout>
      <div className="max-w-3xl mx-auto py-10 space-y-6">
        <div className="h-10 w-48 bg-gray-700 rounded animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
          <div className="h-12 w-full bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
          <div className="h-24 w-full bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
          <div className="h-48 w-full bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
          <div className="h-96 w-full bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="h-12 w-32 bg-gray-700 rounded animate-pulse ml-auto" />
      </div>
    </ContainerLayout>
  );
}

interface PostData {
  content: string;
  coverImageUrl: string;
  excerpt: string;
  slug: string;
  title: string;
}

export default function EditPage() {
  const { postId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get<PostData>(`/api/post/${postId}`);
        const post = res.data;

        setTitle(post.title);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setPreview(post.coverImageUrl);
      } catch (error) {
        const axiosError = error as {
          response?: { data?: { error?: string } };
        };
        toast.error(
          axiosError?.response?.data?.error || "Không thể tải bài viết",
        );
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Vui lòng nhập tiêu đề và nội dung");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const res = await axios.patch(`/api/post/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Cập nhật bài viết thành công!");

      router.replace(`/articles/${res.data.post.slug}`);
    } catch (error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      toast.error(axiosError?.response?.data?.error || "Có lỗi xảy ra");
    } finally {
      setSubmitting(false);
    }
  };

  const config = {
    height: 400,
    readonly: false,
    style: {
      background: "#0f0f0f",
      color: "#fff",
    },
    theme: "dark",
  };

  if (loading) {
    return <EditPageSkeleton />;
  }

  return (
    <ContainerLayout>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-6">
          Chỉnh sửa bài viết
        </h1>

        <form className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2" htmlFor="title">
              Tiêu đề
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-white/10 text-text outline-none focus:border-primary"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề bài viết..."
              type="text"
              value={title}
            />
          </div>

          <div>
            <label
              className="block text-sm text-gray-400 mb-2"
              htmlFor="excerpt"
            >
              Tóm tắt
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-white/10 text-text outline-none focus:border-primary resize-none"
              id="excerpt"
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Mô tả ngắn gọn..."
              rows={3}
              value={excerpt}
            />
          </div>

          <div>
            <label
              className="block text-sm text-gray-400 mb-2"
              htmlFor="coverImage"
            >
              Ảnh bìa
            </label>

            <input
              accept="image/*"
              className="w-full text-gray-300 file:bg-primary file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-white file:cursor-pointer"
              id="coverImage"
              onChange={handleImageChange}
              type="file"
            />

            {preview && (
              <div className="mt-4 relative w-full h-48 rounded-xl border border-white/10 overflow-hidden">
                <Image
                  alt="Preview"
                  className="object-cover"
                  fill
                  src={preview}
                />
              </div>
            )}
          </div>

          <div>
            <label
              className="block text-sm text-gray-400 mb-2"
              htmlFor="content"
            >
              Nội dung
            </label>

            <div className="rounded-xl overflow-hidden border border-white/10">
              <JoditEditor
                config={config}
                onBlur={(newContent) => setContent(newContent)}
                value={content}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-hover transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting}
              onClick={handleSubmit}
              type="button"
            >
              {submitting ? "Đang cập nhật..." : "Cập nhật bài viết"}
            </button>
          </div>
        </form>
      </div>
    </ContainerLayout>
  );
}
