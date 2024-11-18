"use client";
import { getSeries, searchSeries } from "@/Api/GetSeries";
import Footer from "@/Components/Footer";
import NavBar from "@/Components/Navbar";

import type { Series } from "@/objects/series";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaStar, FaSearch, FaPlay, FaHeart } from "react-icons/fa";
import { BiTv } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import Pagination from "@/Components/pagination";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { favContext } from "@/Context/fav";

function Series() {
  const locale = useLocale();
  const t = useTranslations("Series");
  const router = useRouter();
  const [series, setSeries] = useState<Series[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const { fav, setFav } = useContext(favContext);

  useEffect(() => {
    if (search) {
      searchSeries(locale, search).then((data) => {
        setSeries(data.results);
        setTotalPages(data.total_pages);
      });
    } else {
      getSeries(locale, page).then((data) => {
        setSeries(data.results);
        setTotalPages(data.total_pages);
      });
    }
  }, [page, search, locale]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleFavorite = (e: React.MouseEvent, serie: Series) => {
    e.stopPropagation();
    const isFavorite = fav.some((item) => item.id === serie.id);
    if (isFavorite) {
      setFav(fav.filter((item) => item.id !== serie.id));
    } else {
      setFav([...fav, { ...serie, type: "series" }]);
    }
  };

  return (
    <>
      <main className="bg-black">
        <NavBar isSeries={true} />

        <div className="max-w-7xl mx-auto flex justify-center items-center px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder={t("Search for a series")}
              className="w-full p-3 sm:p-4 pl-10 sm:pl-12 text-sm sm:text-base rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:ring-2 focus:outline-none transition-all duration-300 backdrop-blur-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <FaXmark
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg cursor-pointer"
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
            <BiTv className="text-blue-500 text-2xl sm:text-3xl" />
            <h1 className="text-2xl sm:text-4xl font-bold text-white">
              {t("Series")}
            </h1>
          </div>
          {search && (
            <p className="text-white mb-4">
              {t("Search results for")} {search}
            </p>
          )}
          {series.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-6 sm:p-12 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700"
            >
              <div className="relative mb-4 sm:mb-6">
                <BiTv className="text-5xl sm:text-7xl text-gray-500" />
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <FaXmark className="text-3xl text-blue-500" />
                </motion.div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 text-center">
                {t("No Series Found")}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 text-center max-w-md mb-4">
                {t(
                  "Sorry, we couldn't find any TV series matching your search"
                )}
              </p>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <FaSearch className="text-lg" />
                  <span>{search}</span>
                </div>
                <span>•</span>
                <button
                  onClick={() => setSearch("")}
                  className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                >
                  <FaXmark className="text-lg" />
                  <span>{t("Clear search")}</span>
                </button>
              </div>
            </motion.div>
          )}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            {series.map((serie) => (
              <motion.div
                key={serie.id}
                variants={item}
                className="group relative rounded-lg overflow-hidden"
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => router.push(`/series/${serie.id}`)}
                >
                  <Image
                    src={
                      serie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                        : "/Default.png"
                    }
                    alt={serie.name}
                    width={300}
                    height={450}
                    className="object-cover rounded-lg bg-black transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-blue-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-bold text-sm sm:text-xl mb-1 sm:mb-2 stroke-black stroke-2 line-clamp-2">
                      {serie.name}
                    </h3>
                    <div className="flex items-center justify-between text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span className="font-semibold">
                          {serie.vote_average?.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/series/${serie.id}`);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-primary/80 hover:bg-primary text-white transition-colors"
                        >
                          <FaPlay size={14} />
                        </motion.button>
                        <motion.button
                          onClick={(e) => handleFavorite(e, serie)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-2 rounded-full ${
                            fav.some((item) => item.id === serie.id)
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-blue-800/80 hover:bg-blue-700"
                          } text-white transition-colors`}
                        >
                          {fav.some((item) => item.id === serie.id) ? (
                            <FaHeart size={14} />
                          ) : (
                            <FaRegHeart size={14} />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <Pagination
          handlePage={handlePage}
          page={page}
          totalPages={totalPages}
          isSeries={true}
        />
        <Footer bg="bg-black" />
      </main>
    </>
  );
}

export default Series;
