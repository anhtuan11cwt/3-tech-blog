"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import ContainerLayout from "../layouts/ContainerLayout";
import { authClient } from "../lib/auth-client";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function WritePage() {
  const { data: session, isPending } = authClient.useSession();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

    if (!session) {
      toast.error("Vui lòng đăng nhập để viết bài");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      await axios.post("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Đăng bài viết thành công!");

      setTitle("");
      setExcerpt("");
      setContent("");
      setCoverImage(null);
      setPreview(null);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      toast.error(axiosError?.response?.data?.error || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
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

  if (isPending) {
    return (
      <ContainerLayout>
        <div className="max-w-3xl mx-auto py-10 text-center">
          <p className="text-gray-400">Đang tải...</p>
        </div>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-6">
          Viết bài viết mới
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
              disabled={loading}
              onClick={handleSubmit}
              type="button"
            >
              {loading ? "Đang đăng..." : "Đăng bài viết"}
            </button>
          </div>
        </form>
      </div>
    </ContainerLayout>
  );
}
