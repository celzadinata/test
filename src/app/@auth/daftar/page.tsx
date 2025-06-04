"use client";

import Modal from "@/components/core/Modal";
import { RegisterFormType } from "@/utils/helper/TypeHelper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

type ErrorType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<ErrorType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorLog, setErrorLog] = useState<string>("");
  const [disableClose, setDisableClose] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Real-time validation for confirm password
  useEffect(() => {
    if (form.confirmPassword && form.password !== form.confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Password dan konfirmasi password tidak cocok",
      }));
    } else {
      setError((prev) => ({ ...prev, confirmPassword: "" }));
    }
  }, [form.password, form.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name !== "confirmPassword") {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClose = () => {
    setIsOpen(false);
    setDisableClose(true);
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLog("");
    setError({ username: "", email: "", password: "", confirmPassword: "" });

    if (form.password !== form.confirmPassword) {
      setError({
        ...error,
        confirmPassword: "Password dan konfirmasi password tidak cocok",
      });
      return;
    }

    try {
      const res = await fetch("/api/auth/daftar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (data.status !== 200) {
        setError({
          username: data.message.username || "",
          email: data.message.email || "",
          password: data.message.password || "",
          confirmPassword: "",
        });
        setForm({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        return;
      }
      setIsOpen(false);
      setDisableClose(true);
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (err) {
      setErrorLog(`Terjadi kesalahan saat login ${err}`);
    }
  };

  return (
    <>
      {isOpen && (
        <Modal disableClose={disableClose} onClose={handleClose}>
          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium"></h3>
            <p className="mb-4 text-sm font-normal text-gray-800"></p>

            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Daftar
              </p>
              <p className="mt-2 mb-5 text-sm leading-4 text-slate-600">
                Silakan mendaftar di website kami.
              </p>
              {error.username && (
                <p className="text-red-500 mb-3">{error.username}</p>
              )}
              {error.email && (
                <p className="text-red-500 mb-3">{error.email}</p>
              )}
              {error.password && (
                <p className="text-red-500 mb-3">{error.password}</p>
              )}
              {error.confirmPassword && (
                <p className="text-red-500 mb-3">{error.confirmPassword}</p>
              )}
              {errorLog && <p className="text-red-500 mb-3">{errorLog}</p>}
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Masukkan Username"
              />
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Masukkan Email"
              />
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Masukkan Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <label htmlFor="confirmPassword" className="sr-only">
                Konfirmasi Password
              </label>
              <div className="mt-2 relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`block w-full rounded-lg border px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 ${
                    error.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Konfirmasi Password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                Continue
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Sudah punya akun?
              <Link href="/masuk" className="font-medium text-[#4285f4]">
                Masuk
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
