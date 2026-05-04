"use client";

import Link from "next/link";
import { useState } from "react";
import { FiEdit, FiMenu, FiSearch, FiX } from "react-icons/fi";
import { useModalStore } from "../../../store/useModalStore";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/articles", label: "Bài viết" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSignIn, openSearch } = useModalStore();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-transparent">
        <div className="w-[90%] mx-auto flex items-center justify-between h-16">
          <Logo />

          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="hover:text-primary transition-colors"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <button
              className="flex items-center gap-1 hover:text-primary transition-colors"
              onClick={openSearch}
              type="button"
            >
              <FiSearch size={20} />
              <span className="hidden md:inline">Tìm kiếm</span>
            </button>

            <Link
              className="flex items-center gap-1 hover:text-primary transition-colors"
              href="/write"
            >
              <FiEdit size={20} />
              <span>Viết bài</span>
            </Link>

            <button
              className="bg-primary px-4 py-2 rounded-md text-sm text-white hover:bg-hover transition-colors"
              onClick={openSignIn}
              type="button"
            >
              Đăng nhập
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      <div className="md:hidden">
        <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </>
  );
}
