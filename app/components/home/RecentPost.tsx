import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    coverImage: "/p1.png",
    date: "Tháng 5, 2026",
    excerpt: "Khám phá các tính năng mới như server actions và streaming...",
    id: 1,
    title: "Tại sao Next.js 16 là tương lai",
  },
  {
    coverImage: "/p2.png",
    date: "Tháng 4, 2026",
    excerpt: "Đi sâu vào React Server Components...",
    id: 2,
    title: "Hiểu Server Components",
  },
  {
    coverImage: "/p3.png",
    date: "Tháng 3, 2026",
    excerpt: "Xây dựng auth bảo mật trong app hiện đại...",
    id: 3,
    title: "Fullstack Authentication với BetterAuth",
  },
];

export default function RecentPost() {
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
                src={post.coverImage}
                width={400}
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-400">{post.date}</p>

              <h3 className="mt-2 text-lg text-text font-semibold">
                {post.title}
              </h3>

              <p className="mt-2 text-gray-400 line-clamp-3">{post.excerpt}</p>

              <Link
                className="mt-4 inline-block text-primary hover:underline"
                href={`/articles/${post.id}`}
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
