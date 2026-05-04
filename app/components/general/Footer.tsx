import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10 bg-secondary/40 backdrop-blur-lg">
      <div className="w-[90%] xl:w-[75%] mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-text">
              Tech<span className="text-primary">Blog</span>
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              Khám phá những câu chuyện, ý tưởng sáng tạo và hiểu biết về phát
              triển web hiện đại.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-text font-semibold">Điều hướng</h3>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link className="hover:text-text transition" href="/">
                  Trang chủ
                </Link>
              </li>

              <li>
                <Link className="hover:text-text transition" href="/about">
                  Giới thiệu
                </Link>
              </li>

              <li>
                <Link className="hover:text-text transition" href="/articles">
                  Bài viết
                </Link>
              </li>

              <li>
                <Link className="hover:text-text transition" href="/write">
                  Viết bài
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-text font-semibold">Kết nối</h3>

            <p className="text-gray-400 text-sm">
              Theo dõi cập nhật và khám phá thêm nội dung trên nền tảng của
              chúng tôi.
            </p>

            <Link
              className="inline-block px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-hover transition"
              href="/articles"
            >
              Khám phá bài viết
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {currentYear} TechBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
