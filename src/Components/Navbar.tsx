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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="bg-transparent backdrop-blur-sm sticky top-0 z-50 navbar border-b border-white/5 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-20 ${
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
                className={
                  isSeries
                    ? "blue-gradient"
                    : "text-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text "
                }
              >
                AN
              </span>
              <span className="text-white">
                {isSeries ? "Series" : "Movies"}
              </span>
            </span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden mobile-menu-button text-white p-2 hover:bg-white/10 rounded-lg"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div
            className={`hidden lg:flex items-center gap-1 ${
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

          <div
            className={`hidden lg:flex items-center gap-4 ${
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
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white rounded-lg transition-all duration-200 text-sm font-medium`}
                >
                  <FaUserPlus className="text-sm" />
                  <span>{t("Register")}</span>
                </Link>
              </div>
            )}

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

        <div className={`mobile-menu ${isMenuOpen ? "show" : ""}`}>
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/movies"
              className={`flex items-center gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              } px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 w-full`}
            >
              <FaFilm className={isSeries ? "text-blue-500" : "text-red-500"} />
              <span>{t("Movies")}</span>
            </Link>

            <Link
              href="/series"
              className={`flex items-center gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              } px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 w-full`}
            >
              <FaTv className={isSeries ? "text-blue-500" : "text-red-500"} />
              <span>{t("Series")}</span>
            </Link>

            {isLogged && (
              <Link
                href="/favorites"
                className={`flex items-center gap-2 ${
                  isRTL ? "flex-row-reverse" : ""
                } px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 w-full`}
              >
                <FaHeart
                  className={isSeries ? "text-blue-500" : "text-red-500"}
                />
                <span>{t("Favorites")}</span>
              </Link>
            )}

            <div className="space-y-2 pt-4 border-t border-white/10">
              {isLogged ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLogged(false);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 ${
                    isRTL ? "flex-row-reverse" : ""
                  } px-4 py-3 ${
                    isSeries
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white rounded-lg transition-all duration-200 text-sm font-medium w-full`}
                >
                  <FaSignOutAlt />
                  <span>{t("Logout")}</span>
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`flex items-center gap-2 ${
                      isRTL ? "flex-row-reverse" : ""
                    } px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium w-full`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaSignInAlt />
                    <span>{t("Login")}</span>
                  </Link>
                  <Link
                    href="/register"
                    className={`flex items-center gap-2 ${
                      isRTL ? "flex-row-reverse" : ""
                    } px-4 py-3 ${
                      isSeries
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white rounded-lg transition-all duration-200 text-sm font-medium w-full`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserPlus />
                    <span>{t("Register")}</span>
                  </Link>
                </>
              )}
            </div>

            <div className="flex justify-center gap-4 pt-4 border-t border-white/10">
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
