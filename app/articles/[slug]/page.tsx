import Image from "next/image";
import Link from "next/link";
import ContainerLayout from "../../layouts/ContainerLayout";

export default function PostPage() {
  const content = `
    <p>React 19 mang đến những tính năng tuyệt vời giúp cải thiện hiệu suất và trải nghiệm phát triển ứng dụng web.</p>
    
    <h2>Giới thiệu</h2>
    <p>Với các tính năng mới như Server Actions, use hook, và nhiều cải tiến khác, React 19 hứa hẹn sẽ cách mạng hóa cách chúng ta xây dựng ứng dụng.</p>
    
    <h2>Tính năng nổi bật</h2>
    <ul>
      <li>Server Actions - Xử lý form trực tiếp từ server</li>
      <li>use hook - Quản lý state dễ dàng hơn</li>
      <li>Improved performance - Tốc độ render nhanh hơn</li>
      <li>Better error handling - Xử lý lỗi hiệu quả hơn</li>
    </ul>
    
    <h2>Kết luận</h2>
    <p>React 19 là bước tiến lớn trong hệ sinh thái React. Hãy trải nghiệm và khám phá những tính năng mới ngay hôm nay!</p>
  `;

  return (
    <ContainerLayout>
      <article className="max-w-3xl mx-auto text-text">
        <Link
          className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
          href="/articles"
        >
          ← Quay lại tất cả bài viết
        </Link>

        <header className="space-y-4 mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold">
            React 19 là tuyệt vời
          </h1>

          <div className="text-sm text-gray-400">
            Bởi <span className="font-medium text-text">Admin</span> • 4 tháng
            5, 2026
          </div>
        </header>

        <div className="flex gap-4 mb-8">
          <button
            className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/20 transition"
            type="button"
          >
            Chỉnh sửa
          </button>

          <button
            className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 transition"
            type="button"
          >
            Xóa
          </button>
        </div>

        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-10 rounded-2xl overflow-hidden">
          <Image alt="Cover" className="object-cover" fill src="/p1.png" />
        </div>

        <div
          className="prose prose-invert max-w-none leading-relaxed tracking-wide"
          /* biome-ignore lint/security/noDangerouslySetInnerHtml: cần thiết để render HTML từ editor */
          dangerouslySetInnerHTML={{ __html: content }}
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
