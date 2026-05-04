import Image from "next/image";
import Link from "next/link";
import RecentPost from "./components/home/RecentPost";
import ContainerLayout from "./layouts/ContainerLayout";

export default function HomePage() {
  return (
    <ContainerLayout>
      <div className="text-center">
        <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-text leading-tight">
          Chào mừng đến với Tech Blog — Khám phá những câu chuyện và ý tưởng
          sáng tạo
        </h1>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative">
          <Image
            alt="Giới thiệu"
            className="rounded-2xl border border-white/10"
            height={400}
            priority
            src="/about.png"
            width={600}
          />
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl -z-10" />
        </div>

        <div className="max-w-xl">
          <span className="uppercase tracking-widest text-primary text-sm">
            Về TechBlog
          </span>

          <h3 className="mt-3 text-2xl lg:text-3xl xl:text-4xl font-semibold text-text">
            Những cách đơn giản để khơi dậy sáng tạo
          </h3>

          <p className="mt-6 text-gray-400 leading-relaxed">
            TechBlog là nền tảng hiện đại nơi các developer chia sẻ kiến thức,
            khám phá ý tưởng và xây dựng sáng tạo thông qua công nghệ.
          </p>

          <div className="mt-8">
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 border border-white/10 text-text hover:bg-white/20 transition"
              href="/about"
            >
              Tìm hiểu thêm →
            </Link>
          </div>
        </div>
      </div>

      <RecentPost />
    </ContainerLayout>
  );
}
