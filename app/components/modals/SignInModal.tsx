"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { signInWithEmail, signUpWithEmail } from "../../lib/auth-client";
import { useModalStore } from "../../store/useModalStore";
import Modal from "./Modal";

type Mode = "signIn" | "signUp";

export default function SignInModal() {
  const { isSignInOpen, closeAll } = useModalStore();
  const [mode, setMode] = useState<Mode>("signIn");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signIn") {
        await signInWithEmail(email, password);
        toast.success("Đăng nhập thành công!");
        closeAll();
      } else {
        await signUpWithEmail(name, email, password);
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setMode("signIn");
        setEmail("");
        setPassword("");
        setName("");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đã xảy ra lỗi";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeAll();
    setMode("signIn");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Modal isOpen={isSignInOpen} onClose={handleClose}>
      <h2 className="text-xl font-semibold text-text mb-4">
        {mode === "signIn" ? "Đăng nhập Tech Blog" : "Đăng ký Tech Blog"}
      </h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {mode === "signUp" && (
          <input
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-text outline-none focus:border-primary"
            onChange={(e) => setName(e.target.value)}
            placeholder="Họ và tên"
            required
            type="text"
            value={name}
          />
        )}

        <input
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-text outline-none focus:border-primary"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          type="email"
          value={email}
        />

        <div className="relative">
          <input
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-text outline-none focus:border-primary pr-10"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            required
            type={showPassword ? "text" : "password"}
            value={password}
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
          className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-hover transition disabled:opacity-50"
          disabled={loading}
          type="submit"
        >
          {loading
            ? "Đang xử lý..."
            : mode === "signIn"
              ? "Đăng nhập"
              : "Đăng ký"}
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4 text-center">
        {mode === "signIn" ? (
          <>
            Chưa có tài khoản?{" "}
            <button
              className="text-primary hover:underline"
              onClick={() => setMode("signUp")}
              type="button"
            >
              Đăng ký ngay
            </button>
          </>
        ) : (
          <>
            Đã có tài khoản?{" "}
            <button
              className="text-primary hover:underline"
              onClick={() => setMode("signIn")}
              type="button"
            >
              Đăng nhập ngay
            </button>
          </>
        )}
      </p>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Bằng việc tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật
      </p>
    </Modal>
  );
}
