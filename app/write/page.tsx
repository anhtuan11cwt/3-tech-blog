"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import ContainerLayout from "../layouts/ContainerLayout";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function WritePage() {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
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
              placeholder="Nhập tiêu đề bài viết..."
              type="text"
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
              placeholder="Mô tả ngắn gọn..."
              rows={3}
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
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-hover transition"
              type="submit"
            >
              Đăng bài viết
            </button>
          </div>
        </form>
      </div>
    </ContainerLayout>
  );
}
