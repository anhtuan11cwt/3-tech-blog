import Image from "next/image";
import Link from "next/link";
import { posts } from "../data/posts";
import ContainerLayout from "../layouts/ContainerLayout";

export default function ArticlesPage() {
  return (
    <ContainerLayout>
      <div className="text-center">
        <h1 className="text-3xl lg:text-5xl font-bold text-text">
          Khám phá tất cả bài viết
        </h1>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          Khám phá những câu chuyện, hướng dẫn và insights từ cộng đồng công
          nghệ của chúng tôi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {posts.map((post) => (
          <article
            className="group rounded-xl overflow-hidden border border-white/10 bg-secondary transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            key={post.id}
          >
            <div className="relative h-48 w-full">
              <Image
                alt={post.title}
                className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                fill
                src={post.coverImage}
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="p-5 space-y-3">
              <p className="text-sm text-gray-400">{post.date}</p>
              <h3 className="text-lg font-semibold text-text">{post.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {post.excerpt}
              </p>

              <Link
                className="text-sm text-primary hover:underline"
                href={`/articles/${post.id}`}
              >
                Đọc tiếp →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          className="px-6 py-3 rounded-lg bg-secondary border border-white/10 text-text hover:bg-white/10 transition"
          type="button"
        >
          Tải thêm bài viết
        </button>
      </div>
    </ContainerLayout>
  );
}
