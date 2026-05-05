"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import ContainerLayout from "../../layouts/ContainerLayout";
import { authClient } from "../../lib/auth-client";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImageUrl: string | null;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type Props = {
  postPromise: Promise<Post | null>;
};

export default function BlogView({ postPromise }: Props) {
  const post = use(postPromise);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!post) {
    return (
      <ContainerLayout>
        <div className="mx-auto mt-20 max-w-3xl text-gray-400 text-center">
          Không tìm thấy bài viết
        </div>
      </ContainerLayout>
    );
  }

  const isAuthor = session?.user?.id === post.author.id;

  return (
    <ContainerLayout>
      <article className="mx-auto max-w-3xl text-text">
        <Link
          className="flex items-center gap-2 mb-8 text-gray-400 hover:text-primary transition-colors"
          href="/articles"
        >
          ← Quay lại tất cả bài viết
        </Link>

        {/* Cover Image */}
        {post.coverImageUrl && (
          <div className="relative mb-10 rounded-2xl w-full h-64 md:h-80 lg:h-96 overflow-hidden">
            <Image
              alt={post.title}
              className="object-cover"
              fill
              src={post.coverImageUrl}
            />
          </div>
        )}

        <header className="space-y-4 mb-8">
          <h1 className="font-bold text-3xl lg:text-5xl">{post.title}</h1>

          <div className="flex items-center gap-3 text-gray-400 text-sm">
            {post.author.image && (
              <Image
                alt="tác giả"
                className="rounded-full"
                height={40}
                src={post.author.image}
                width={40}
              />
            )}
            <div>
              <span className="font-medium text-text">
                {post.author.name || "Tác giả không xác định"}
              </span>
              <span className="mx-2">•</span>
              <span>
                {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Edit/Delete Actions */}
        {isAuthor && (
          <div className="flex gap-4 mb-8">
            <button
              className="bg-yellow-500/10 hover:bg-yellow-500/20 px-4 py-2 border border-yellow-500/30 rounded-lg text-yellow-400 transition"
              onClick={() => router.push(`/write/edit/${post.id}`)}
              type="button"
            >
              Chỉnh sửa
            </button>

            <button
              className="bg-red-500/10 hover:bg-red-500/20 px-4 py-2 border border-red-500/30 rounded-lg text-red-400 transition"
              type="button"
            >
              Xóa
            </button>
          </div>
        )}

        {/* Content */}
        <div
          className="block-content prose-invert max-w-none leading-relaxed tracking-wide prose"
          /* biome-ignore lint/security/noDangerouslySetInnerHtml: cần thiết để render HTML từ editor */
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <hr className="my-10 border-white/10" />

        <div className="mt-10">
          <Link className="text-primary hover:underline" href="/articles">
            ← Quay lại tất cả bài viết
          </Link>
        </div>
      </article>
    </ContainerLayout>
  );
}
