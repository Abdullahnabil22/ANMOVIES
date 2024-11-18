"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { useLogged } from "../Context/logged";
import {
  FaFilm,
  FaHeart,
  FaSignInAlt,
  FaSignOutAlt,
  FaTv,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

function NavBar({ isSeries }: { isSeries: boolean }) {
  console.log("isSeries:", isSeries);

  const { isLogged, setIsLogged } = useLogged();
  const t = useTranslations("Home");
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, [setIsLogged]);

  const handleLanguageChange = (langCode: string) => {
    Cookies.set("NEXT_LOCALE", langCode, {
      path: "/",
      expires: 365,
    });
    const currentPath = window.location.pathname;
    window.location.href = `/${langCode}${currentPath}`;
  };

  if (!t || !locale) {
    return null;
  }

  return (
    <nav className="bg-transparent backdrop-blur-sm sticky top-0 z-50 navbar border-b border-white/5">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div
          className={`flex items-center justify-between h-16 sm:h-20 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <Link
            href="/"
            className={`flex items-center ${
              isRTL ? "space-x-reverse" : "space-x-2"
            } group`}
          >
            <span className="font-['Audiowide'] text-2xl sm:text-3xl md:text-4xl font-bold">
              <span
                className={
                  isSeries
                    ? "blue-gradient"
                    : "text-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text"
                }
              >
                AN
              </span>
              <span className="text-white">
                {isSeries ? "Series" : "Movies"}
              </span>
            </span>
          </Link>

          <div
            className={`flex items-center gap-0.5 sm:gap-1 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Link
              href="/movies"
              className={`flex items-center gap-1 sm:gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              } 
                px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-gray-300 hover:text-white 
                hover:bg-white/10 transition-all duration-200`}
            >
              <FaFilm
                className={`text-sm sm:text-base ${
                  isSeries ? "text-blue-500" : "text-red-500"
                }`}
              />
              <span className="hidden md:inline">{t("Movies")}</span>
            </Link>

            <Link
              href="/series"
              className={`flex items-center gap-1 sm:gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              } 
                px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-gray-300 hover:text-white 
                hover:bg-white/10 transition-all duration-200`}
            >
              <FaTv
                className={`text-sm sm:text-base ${
                  isSeries ? "text-blue-500" : "text-red-500"
                }`}
              />
              <span className="hidden md:inline">{t("Series")}</span>
            </Link>

            {isLogged && (
              <Link
                href="/favorites"
                className={`flex items-center gap-1 sm:gap-2 ${
                  isRTL ? "flex-row-reverse" : ""
                } 
                  px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-gray-300 hover:text-white 
                  hover:bg-white/10 transition-all duration-200`}
              >
                <FaHeart
                  className={`text-sm sm:text-base ${
                    isSeries ? "text-blue-500" : "text-red-500"
                  }`}
                />
                <span className="hidden md:inline">{t("Favorites")}</span>
              </Link>
            )}
          </div>

          <div
            className={`flex items-center gap-2 sm:gap-4 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {isLogged ? (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLogged(false);
                }}
                className={`flex items-center gap-1 sm:gap-2 ${
                  isRTL ? "flex-row-reverse" : ""
                } 
                  px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 
                  ${
                    isSeries
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-red-600 hover:bg-red-700"
                  }
                  text-white rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium`}
              >
                <FaSignOutAlt className="text-xs sm:text-sm" />
                <span className="hidden md:inline">{t("Logout")}</span>
              </button>
            ) : (
              <div
                className={`flex items-center gap-1 sm:gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Link
                  href="/login"
                  className={`flex items-center gap-1 sm:gap-2 ${
                    isRTL ? "flex-row-reverse" : ""
                  } 
                    px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-gray-300 hover:text-white 
                    hover:bg-white/10 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium`}
                >
                  <FaSignInAlt className="text-xs sm:text-sm" />
                  <span className="hidden md:inline">{t("Login")}</span>
                </Link>
                <Link
                  href="/register"
                  className={`flex items-center gap-1 sm:gap-2 ${
                    isRTL ? "flex-row-reverse" : ""
                  } 
                    px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 
                    ${
                      isSeries
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-red-500 hover:bg-red-600"
                    }
                    text-white rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium`}
                >
                  <FaUserPlus className="text-xs sm:text-sm" />
                  <span className="hidden md:inline">{t("Register")}</span>
                </Link>
              </div>
            )}

            <div
              className={`flex items-center gap-1 sm:gap-2 
              ${isRTL ? "border-r mr-2 sm:mr-4" : "border-l ml-2 sm:ml-4"} 
              border-white/10 pl-2 sm:pl-4`}
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
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden transition-all duration-200 ${
                    locale === code
                      ? isSeries
                        ? "ring-2 ring-blue-500 ring-offset-1 ring-offset-black blue-ring"
                        : "ring-2 ring-red-500 ring-offset-1 ring-offset-black red-ring"
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

NavBar.displayName = "NavBar";

export default NavBar;
