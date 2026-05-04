"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useModalStore } from "../../store/useModalStore";
import Modal from "./Modal";

export default function SignInModal() {
  const { isSignInOpen, closeAll } = useModalStore();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Modal isOpen={isSignInOpen} onClose={closeAll}>
      <h2 className="text-xl font-semibold text-text mb-4">
        Đăng nhập Tech Blog
      </h2>

      <form className="space-y-3">
        <div>
          <input
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-text outline-none focus:border-primary"
            placeholder="Email"
            type="email"
          />
        </div>

        <div className="relative">
          <input
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-text outline-none focus:border-primary pr-10"
            placeholder="Mật khẩu"
            type={showPassword ? "text" : "password"}
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black z-20 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-hover transition"
          type="button"
        >
          Đăng nhập
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Bằng việc tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật
      </p>
    </Modal>
  );
}
