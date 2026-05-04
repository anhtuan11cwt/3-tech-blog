import Link from "next/link";
import { FiEdit, FiSearch } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/articles", label: "Bài viết" },
];

export default function MobileNav({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <>
      <button
        aria-label="Đóng menu"
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        type="button"
      />

      <div
        className={`fixed top-16 right-0 w-full h-[80vh] bg-secondary/80 backdrop-blur-lg transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col items-center justify-center gap-6`}
      >
        {navLinks.map((link) => (
          <Link
            className="text-lg font-semibold hover:text-primary transition-colors"
            href={link.href}
            key={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <div className="flex flex-col items-center gap-4 mt-4">
          <button className="flex items-center gap-2 text-base" type="button">
            <FiSearch size={24} />
            Tìm kiếm
          </button>

          <Link className="flex items-center gap-2 text-base" href="/write">
            <FiEdit size={24} />
            Viết bài
          </Link>

          <button
            className="bg-primary px-6 py-3 rounded-md text-base text-white"
            type="button"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </>
  );
}
