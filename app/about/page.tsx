import Image from "next/image";
import Link from "next/link";
import ContainerLayout from "../layouts/ContainerLayout";

const topics = [
  "Phát triển Web",
  "Next.js & React",
  "Kỹ thuật Backend",
  "DevOps & Triển khai",
  "Thiết kế UI/UX",
  "Mẹo lập trình",
];

export default function AboutPage() {
  return (
    <ContainerLayout>
      <div className="py-12 md:py-20 space-y-20">
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text">
            Về Tech Blog
          </h1>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Nền tảng hiện đại nơi các developer chia sẻ ý tưởng, khám phá công
            nghệ và truyền cảm hứng sáng tạo thông qua viết lách kỹ thuật.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              alt="Giới thiệu Tech Blog"
              className="rounded-2xl border border-white/10"
              height={400}
              src="/about.png"
              width={600}
            />
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl -z-10" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-text">
              Những cách đơn giản để thể hiện ý tưởng
            </h2>

            <p className="mt-6 text-gray-400 leading-relaxed">
              Tech Blog được thiết kế dành cho những developer yêu thích viết
              lách, chia sẻ và học hỏi. Dù bạn là người mới bắt đầu hay kỹ sư
              already có kinh nghiệm, nền tảng này cung cấp công cụ để bạn thể
              hiện kiến thức của mình.
            </p>
          </div>
        </div>

        <div className="py-16">
          <h3 className="text-2xl font-semibold text-text mb-8">
            Chủ đề chúng tôi cover
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                className="p-6 rounded-xl bg-secondary border border-white/10 hover:border-white/20 transition"
                key={topic}
              >
                <p className="text-gray-300 font-medium">{topic}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-20 text-center">
          <h3 className="text-3xl font-semibold text-text">
            Sẵn sàng khám phá bài viết?
          </h3>

          <p className="mt-4 text-gray-400">
            Khám phá những bài viết hữu ích từ các developer trên khắp thế giới.
          </p>

          <Link
            className="inline-block mt-8 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-hover transition"
            href="/articles"
          >
            Khám phá bài viết
          </Link>
        </div>
      </div>
    </ContainerLayout>
  );
}
