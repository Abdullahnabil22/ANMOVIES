"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLogged } from "@/Context/logged";
function Register() {
  const router = useRouter();
  const t = useTranslations("Home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLogged } = useLogged();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("token", "token123");
    setIsLogged(true);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/5"
      >
        <Link href="/" className="flex justify-center mb-8">
          <span className="font-['Audiowide'] text-4xl font-bold">
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
              AN
            </span>
            <span className="text-white">Movies</span>
          </span>
        </Link>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {t("Create New Account")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("Username")}
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-white"
                placeholder={t("Enter your username")}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("Email")}
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-white"
                placeholder={t("Enter your email")}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("Password")}
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-white"
                placeholder={t("Enter your password")}
              />
              {showPassword ? (
                <FaEye
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          <motion.button
            whileHover={{
              backgroundPosition: ["0%", "100%"],
              transition: { duration: 0.8, repeat: Infinity },
            }}
            initial={{ backgroundPosition: "0%" }}
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg transition-all duration-200 text-sm font-medium hover:shadow-lg hover:shadow-red-500/20 bg-[length:200%_100%]"
          >
            <FaUserPlus className="text-sm" />
            <span>{t("Sign Up")}</span>
          </motion.button>

          <p className="text-center text-gray-400 text-sm">
            {t("Already have an account?")}{" "}
            <Link
              href="/login"
              className="text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              {t("Login")}
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;
