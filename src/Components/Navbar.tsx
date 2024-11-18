"use client";

import Link from "next/link";
import Cookies from "js-cookie";

import { useLogged } from "../Context/logged";
import {
  FaFilm,
  FaHeart,
  FaSignInAlt,
  FaSignOutAlt,
  FaTv,
  FaUserPlus,
} from "react-icons/fa";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

function NavBar({ isSeries }: { isSeries: boolean }) {
  const { isLogged, setIsLogged } = useLogged();
  const t = useTranslations("Home");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const handleLanguageChange = (langCode: string) => {
    Cookies.set("NEXT_LOCALE", langCode, {
      path: "/",
      expires: 365,
    });
    window.location.reload();
  };
  return (
    <nav className="bg-transparent backdrop-blur-sm sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-16 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <Link
            href="/"
            className={`flex items-center ${
              isRTL ? "space-x-reverse" : "space-x-2"
            } group`}
          >
            <span className="font-['Audiowide'] text-4xl font-bold">
              <span
                className={`bg-gradient-to-r ${
                  isSeries
                    ? "from-blue-500 via-blue-600 to-blue-700"
                    : "from-red-500 via-red-600 to-red-700"
                } bg-clip-text text-transparent`}
              >
                AN
              </span>
              <span className="text-white">
                {isSeries ? "Series" : "Movies"}
              </span>
            </span>
          </Link>

          <div
            className={`hidden md:flex items-center gap-1 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Link
              href="/movies"
              className={`flex items-center gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              } px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200`}
            >
              <FaFilm className={isSeries ? "text-blue-500" : "text-red-500"} />
              <span>{t("Movies")}</span>
            </Link>

            <Link
              href="/series"
              className={`flex items-center gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              } px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200`}
            >
              <FaTv className={isSeries ? "text-blue-500" : "text-red-500"} />
              <span>{t("Series")}</span>
            </Link>

            {isLogged && (
              <Link
                href="/favorites"
                className={`flex items-center gap-2 ${
                  isRTL ? "flex-row-reverse" : ""
                } px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200`}
              >
                <FaHeart
                  className={isSeries ? "text-blue-500" : "text-red-500"}
                />
                <span>{t("Favorites")}</span>
              </Link>
            )}
          </div>

          {/* Auth & Language */}
          <div
            className={`flex items-center gap-4 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {isLogged ? (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLogged(false);
                }}
                className={`flex items-center gap-2 ${
                  isRTL ? "flex-row-reverse" : ""
                } px-4 py-2 ${
                  isSeries
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white rounded-lg transition-all duration-200 text-sm font-medium`}
              >
                <FaSignOutAlt className="text-sm" />
                <span>{t("Logout")}</span>
              </button>
            ) : (
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Link
                  href="/login"
                  className={`flex items-center gap-2 ${
                    isRTL ? "flex-row-reverse" : ""
                  } px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium`}
                >
                  <FaSignInAlt className="text-sm" />
                  <span>{t("Login")}</span>
                </Link>
                <Link
                  href="/register"
                  className={`flex items-center gap-2 ${
                    isRTL ? "flex-row-reverse" : ""
                  } px-4 py-2 ${
                    isSeries
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white rounded-lg transition-all duration-200 text-sm font-medium`}
                >
                  <FaUserPlus className="text-sm" />
                  <span>{t("Register")}</span>
                </Link>
              </div>
            )}

            {/* Language Switcher */}
            <div
              className={`flex items-center gap-2 ${
                isRTL ? "border-r mr-4" : "border-l ml-4"
              } border-white/10 px-4`}
            >
              {[
                { code: "ar", flag: "EG", label: "Arabic" },
                { code: "en", flag: "840", label: "English" },
              ].map(({ code, flag, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    handleLanguageChange(code);
                    window.location.href = window.location.pathname;
                  }}
                  className={`w-8 h-8 rounded-full overflow-hidden transition-all duration-200 ${
                    locale === code
                      ? isSeries
                        ? "ring-2 ring-blue-500 ring-offset-1 ring-offset-black"
                        : "ring-2 ring-red-500 ring-offset-1 ring-offset-black"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={`/flags/M/${flag}.svg`}
                    alt={label}
                    className="w-full h-full object-cover"
                    width={32}
                    height={32}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;