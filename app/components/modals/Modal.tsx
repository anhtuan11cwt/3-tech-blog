"use client";

import { type ReactNode, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <button
        aria-label="Đóng modal"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
        onClick={onClose}
        type="button"
      />

      <div className="relative z-10 w-[90%] max-w-md bg-secondary border border-white/10 rounded-2xl p-6 transition-all duration-300 animate-in fade-in zoom-in-95">
        {children}
      </div>
    </div>
  );
}
