"use client";
import { getMovies, searchMovies } from "@/Api/GET";
import Footer from "@/Components/Footer";
import NavBar from "@/Components/Navbar";

import { Movie } from "@/objects/movies.if";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaStar, FaSearch, FaPlay, FaHeart } from "react-icons/fa";
import { FaXmark, FaRegHeart } from "react-icons/fa6";
import { useDebounce } from "use-debounce";
import { RiMovie2Line } from "react-icons/ri";
import Pagination from "@/Components/pagination";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { favContext } from "@/Context/fav";
import { Series } from "@/objects/series";

function Movies() {
  const locale = useLocale();
  const t = useTranslations("Movies");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search] = useDebounce(searchInput, 500);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { fav, setFav } = useContext(favContext);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    if (search) {
      searchMovies(locale, search)
        .then((data) => {
          setMovies(data.results);
          setTotalPages(data.total_pages);
        })
        .catch((err) => {
          setError(
            "Failed to fetch movies. Please try again later. " + err.message
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getMovies(locale, page)
        .then((data) => {
          setMovies(data.results);
          setTotalPages(data.total_pages);
        })
        .catch((err) => {
          setError(
            "Failed to fetch movies. Please try again later. " + err.message
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, search, locale]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
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

  const handleFavorite = (e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation();

    const isFavorite = fav.some((item) => item.id === movie.id);
    if (isFavorite) {
      setFav(fav.filter((item) => item.id !== movie.id) as Movie[] & Series[]);
    } else {
      setFav([...fav, { ...movie, type: "movie" }] as Movie[] & Series[]);
    }
  };

  return (
    <>
      <main className="bg-black">
        <NavBar isSeries={false} />

        <div className="max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder={t("Search for a movie")}
              className="w-full p-4 pl-12 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700 focus:border-red-500 focus:ring-red-500 focus:ring-2 focus:outline-none transition-all duration-300 backdrop-blur-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <FaXmark
              onClick={() => setSearchInput("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg cursor-pointer"
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <div className="flex items-center gap-3 mb-8">
            <RiMovie2Line className="text-red-500 text-3xl" />
            <h1 className="text-4xl font-bold text-white">{t("Movies")}</h1>
          </div>
          {search && (
            <p className="text-white mb-4">
              {t("Search results for")} {search}
            </p>
          )}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          )}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          {movies.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-12 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700"
            >
              <div className="relative mb-6">
                <RiMovie2Line className="text-7xl text-gray-500" />
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
                  <FaXmark className="text-3xl text-red-500" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {t("No Movies Found")}
              </h3>
              <p className="text-gray-400 text-center max-w-md mb-4">
                {t("Sorry, we couldn't find any movies matching your search")}
              </p>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <FaSearch className="text-lg" />
                  <span>{search}</span>
                </div>
                <span>•</span>
                <button
                  onClick={() => setSearchInput("")}
                  className="flex items-center gap-1 hover:text-red-500 transition-colors"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                variants={item}
                className="group relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/Default.png"
                    }
                    alt={movie.title}
                    width={300}
                    height={450}
                    priority
                    className="object-cover rounded-lg bg-black transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-red-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-bold text-xl mb-2 stroke-black stroke-2">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span className="font-semibold">
                          {movie.vote_average?.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => router.push(`/movies/${movie.id}`)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-primary/80 hover:bg-primary text-white transition-colors"
                        >
                          <FaPlay size={14} />
                        </motion.button>
                        <motion.button
                          onClick={(e) => handleFavorite(e, movie)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-2 rounded-full ${
                            fav.some((item) => item.id === movie.id)
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-red-800/80 hover:bg-red-700"
                          } text-white transition-colors`}
                        >
                          {fav.some((item) => item.id === movie.id) ? (
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
          isSeries={false}
        />
        <Footer bg="bg-black" />
      </main>
    </>
  );
}

export default Movies;
