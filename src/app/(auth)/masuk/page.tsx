"use client";

import type React from "react";

import type { LoginFormType } from "@/utils/helper/TypeHelper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Newspaper } from "lucide-react";
import { WithAuth } from "@/components/core/ProtectedAuth";

function LoginPageContent() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on change
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/masuk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === 405) {
        setError(data.message);
        return;
      }

      if (data.status !== 200) {
        setError(
          typeof data.message.errors === "string"
            ? data.message.errors
            : JSON.stringify(data.message.errors)
        );
        return;
      }

      // Redirect to home or dashboard after successful login
      router.back();
      router.refresh();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 100);
    } catch (err) {
      setError(`Terjadi kesalahan saat login ${err}`);
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
            <h1 className="text-6xl font-bokor mb-4">Warung Jurnalis</h1>
            <p className="text-xl text-gray-300 mb-12">
              Portal Berita Terpercaya Indonesia
            </p>

            <div className="space-y-6 max-w-sm">
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Berita Terkini</h3>
                <p className="text-gray-400">
                  Dapatkan informasi terbaru setiap hari
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">
                  Jurnalisme Berkualitas
                </h3>
                <p className="text-gray-400">Menangkal Hoaks</p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Akses Mudah</h3>
                <p className="text-gray-400">
                  Baca berita kapan saja, dimana saja
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
              <h2 className="text-2xl font-bold text-black mb-2">Masuk</h2>
              <p className="text-gray-600">Silakan masuk untuk melanjutkan</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <p className="text-sm text-gray-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
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
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
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
                  "Masuk"
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
                    Belum punya akun?
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/daftar"
                  className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-black hover:text-white transition-all duration-200"
                >
                  Daftar Sekarang
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

export default function LoginPage() {
  return (
    <WithAuth requireAuth={false}>
      <LoginPageContent />
    </WithAuth>
  );
}
