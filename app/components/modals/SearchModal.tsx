"use client";

import { useEffect, useRef } from "react";
import { useModalStore } from "../../store/useModalStore";
import Modal from "./Modal";

export default function SearchModal() {
  const { isSearchOpen, closeAll } = useModalStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  return (
    <Modal isOpen={isSearchOpen} onClose={closeAll}>
      <input
        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-text outline-none mb-4"
        placeholder="Tìm kiếm bài viết..."
        ref={inputRef}
        type="text"
      />

      <div className="space-y-2">
        {["Next.js tips", "React 19", "Zustand guide"].map((item) => (
          <div
            className="p-2 rounded-md hover:bg-white/5 cursor-pointer text-gray-300"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </Modal>
  );
}
