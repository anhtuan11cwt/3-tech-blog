"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Post } from "../../types/post";
import PostCardSkeleton from "../skeleton/PostCardSkeleton";

export default function RecentPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const res = await fetch("/api/post/recent");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    getRecentPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-20">
        <h2 className="font-semibold text-text text-2xl lg:text-3xl">
          Bài viết mới nhất
        </h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {[1, 2, 3].map((item) => (
            <PostCardSkeleton key={item} />
          ))}
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="mt-20">
        <h2 className="font-semibold text-text text-2xl lg:text-3xl">
          Bài viết mới nhất
        </h2>
        <p className="mt-8 text-gray-400">Không có bài viết nào.</p>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <h2 className="font-semibold text-text text-2xl lg:text-3xl">
        Bài viết mới nhất
      </h2>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {posts.map((post) => (
          <article
            className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden transition hover:-translate-y-1"
            key={post.id}
          >
            <div className="relative overflow-hidden">
              <Image
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                height={300}
                src={post.coverImageUrl || "/placeholder.jpg"}
                width={400}
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="p-4">
              <p className="text-gray-400 text-sm">
                {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <h3 className="mt-2 font-semibold text-text text-lg">
                {post.title}
              </h3>

              <p className="mt-2 text-gray-400 line-clamp-3">{post.excerpt}</p>

              <Link
                className="inline-block mt-4 text-primary hover:underline"
                href={`/articles/${post.slug}`}
              >
                Đọc tiếp →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
