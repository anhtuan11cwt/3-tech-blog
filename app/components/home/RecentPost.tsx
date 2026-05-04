import Image from "next/image";
import Link from "next/link";
import type { Post } from "../../types/post";

async function getRecentPosts(): Promise<Post[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/recent`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Lỗi khi lấy bài viết");
  }

  return res.json();
}

export default async function RecentPost() {
  const posts = await getRecentPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="mt-20">
        <h2 className="text-2xl lg:text-3xl font-semibold text-text">
          Bài viết mới nhất
        </h2>
        <p className="mt-8 text-gray-400">Không có bài viết nào.</p>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <h2 className="text-2xl lg:text-3xl font-semibold text-text">
        Bài viết mới nhất
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            className="group rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:-translate-y-1 transition"
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
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <h3 className="mt-2 text-lg text-text font-semibold">
                {post.title}
              </h3>

              <p className="mt-2 text-gray-400 line-clamp-3">{post.excerpt}</p>

              <Link
                className="mt-4 inline-block text-primary hover:underline"
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
