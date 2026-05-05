"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { searchPosts } from "../../services/post";
import { useModalStore } from "../../store/useModalStore";
import Modal from "./Modal";

export default function SearchModal() {
  const { isSearchOpen, closeAll } = useModalStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const { data: results, isLoading } = useQuery({
    enabled: debouncedQuery.length > 1,
    queryFn: () => searchPosts(debouncedQuery),
    queryKey: ["search", debouncedQuery],
  });

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const handleClose = () => {
    closeAll();
    setQuery("");
  };

  return (
    <Modal isOpen={isSearchOpen} onClose={handleClose}>
      <input
        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-text outline-none mb-4"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm kiếm bài viết..."
        ref={inputRef}
        type="text"
        value={query}
      />

      {isLoading && (
        <p className="text-gray-400 text-sm py-2">Đang tìm kiếm...</p>
      )}

      {!isLoading && debouncedQuery && results?.length === 0 && (
        <p className="text-gray-400 text-sm py-2">Không tìm thấy kết quả nào</p>
      )}

      {!query && (
        <p className="text-gray-400 text-sm py-2">
          Nhập từ khóa để tìm kiếm bài viết
        </p>
      )}

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {results?.map(
          (post: {
            id: string;
            title: string;
            slug: string;
            excerpt: string;
            coverImageUrl: string | null;
          }) => (
            <Link
              className="block p-3 rounded-md hover:bg-white/5 text-gray-300 transition"
              href={`/articles/${post.slug}`}
              key={post.id}
              onNavigate={handleClose}
            >
              <p className="font-medium text-text">{post.title}</p>
              {post.excerpt && (
                <p className="text-sm text-gray-400 line-clamp-1 mt-1">
                  {post.excerpt}
                </p>
              )}
            </Link>
          ),
        )}
      </div>
    </Modal>
  );
}
