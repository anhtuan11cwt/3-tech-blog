"use client";

import Image from "next/image";
import Link from "next/link";
import { FiEdit, FiSearch } from "react-icons/fi";
import { authClient } from "../../../lib/auth-client";
import { useModalStore } from "../../../store/useModalStore";

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
  const { openSearch, openSignIn } = useModalStore();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
  };

  if (isPending) {
    return null;
  }

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
          <button
            className="flex items-center gap-2 text-base"
            onClick={openSearch}
            type="button"
          >
            <FiSearch size={24} />
            Tìm kiếm
          </button>

          {session ? (
            <>
              <Link
                className="flex items-center gap-2 text-base"
                href="/write"
                onClick={() => setMenuOpen(false)}
              >
                <FiEdit size={24} />
                Viết bài
              </Link>

              <div className="flex items-center gap-3 py-2">
                {session.user.image ? (
                  <Image
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    height={40}
                    src={session.user.image}
                    unoptimized
                    width={40}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-base font-medium text-primary">
                    {session.user.name?.charAt(0).toUpperCase() ||
                      session.user.email?.charAt(0).toUpperCase()}
                  </div>
                )}

                <span className="text-base font-medium">
                  {session.user.name || session.user.email}
                </span>
              </div>

              <button
                className="text-base text-red-500 hover:text-red-600"
                onClick={handleLogout}
                type="button"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                className="flex items-center gap-2 text-base"
                href="/write"
                onClick={() => setMenuOpen(false)}
              >
                <FiEdit size={24} />
                Viết bài
              </Link>

              <button
                className="bg-primary px-6 py-3 rounded-md text-base text-white"
                onClick={openSignIn}
                type="button"
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
