"use client";

import type React from "react";

import type { RegisterFormType } from "@/utils/helper/TypeHelper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Newspaper,
  UserPlus,
  Shield,
  CheckCircle,
} from "lucide-react";
import { WithAuth } from "@/components/core/ProtectedAuth";

type ErrorType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterPageContent() {
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLog("");
    setError({ username: "", email: "", password: "", confirmPassword: "" });
    setIsLoading(true);

    if (form.password !== form.confirmPassword) {
      setError({
        ...error,
        confirmPassword: "Password dan konfirmasi password tidak cocok",
      });
      setIsLoading(false);
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

      router.push("/");
      router.refresh();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 200);
    } catch (err) {
      setErrorLog(`Terjadi kesalahan saat mendaftar ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative">
        <div className="flex flex-col justify-center items-center text-white p-12 w-full">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Newspaper className="w-20 h-20 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Bergabung dengan Kami</h1>
            <p className="text-xl text-gray-300 mb-12">
              Menangkal Berita Hoaks
            </p>

            <div className="space-y-6 max-w-sm">
              <div className="flex items-start space-x-4">
                <UserPlus className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-2">Akses Komentar</h3>
                  <p className="text-gray-400">Berkomentar dengan bijak</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-2">
                    Keamanan Terjamin
                  </h3>
                  <p className="text-gray-400">
                    Data Anda aman dan terlindungi
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-2">
                    Gratis Selamanya
                  </h3>
                  <p className="text-gray-400">Tidak ada biaya tersembunyi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Newspaper className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-black">Warung Jurnalis</h1>
            <p className="text-gray-600">Portal Berita Terpercaya</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-2">Daftar</h2>
              <p className="text-gray-600">
                Silakan mendaftar untuk bergabung dengan kami
              </p>
            </div>

            {/* Error Messages */}
            {(error.username ||
              error.email ||
              error.password ||
              error.confirmPassword ||
              errorLog) && (
              <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg space-y-1">
                {error.username && (
                  <p className="text-sm text-gray-700">{error.username}</p>
                )}
                {error.email && (
                  <p className="text-sm text-gray-700">{error.email}</p>
                )}
                {error.password && (
                  <p className="text-sm text-gray-700">{error.password}</p>
                )}
                {error.confirmPassword && (
                  <p className="text-sm text-gray-700">
                    {error.confirmPassword}
                  </p>
                )}
                {errorLog && (
                  <p className="text-sm text-gray-700">{errorLog}</p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 ${
                    error.username ? "border-gray-400" : "border-gray-300"
                  }`}
                  placeholder="Masukkan username"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 ${
                    error.email ? "border-gray-400" : "border-gray-300"
                  }`}
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 ${
                      error.password ? "border-gray-400" : "border-gray-300"
                    }`}
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-black transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 transition-all duration-200 ${
                      error.confirmPassword
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-black focus:border-black"
                    }`}
                    placeholder="Konfirmasi password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-black transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {error.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {error.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Memproses...
                  </div>
                ) : (
                  "Daftar Sekarang"
                )}
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Sudah punya akun?
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/masuk"
                  className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-black hover:text-white transition-all duration-200"
                >
                  Masuk Sekarang
                </Link>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-black transition-colors duration-200"
              >
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <WithAuth requireAuth={false}>
      <RegisterPageContent />
    </WithAuth>
  );
}
