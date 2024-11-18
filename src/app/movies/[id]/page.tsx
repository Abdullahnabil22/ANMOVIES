"use client";

import {
  getMovieCredits,
  getMovieDetails,
  getMovieLogo,
  getMovieRecommendations,
  getMovieSimilar,
} from "@/Api/GET";
import { Cast, Movie } from "@/objects/movies.if";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
} from "react-icons/fa";
import Image from "next/image";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Loading from "@/app/loading";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

function MoviePage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Movies");
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [credits, setCredits] = useState<Cast[]>([]);
  const [similar, setSimilar] = useState<Movie[]>([]);

  useEffect(() => {
    getMovieDetails(Number(id), locale)
      .then((data) => setMovie(data))
      .finally(() => setLoading(false));
    getMovieLogo(Number(id)).then((data) => setLogo(data ?? ""));
    getMovieRecommendations(Number(id), locale).then((data) =>
      setRecommendations(data.results)
    );
    getMovieCredits(Number(id), locale).then((data) => setCredits(data.cast));
    getMovieSimilar(Number(id), locale).then((data) =>
      setSimilar(data.results)
    );
  }, [id, locale]);
  if (loading) {
    return <Loading />;
  }

  if (!movie) return null;

  return (
    <>
      <main className="bg-gray-900">
        <Navbar isSeries={false} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen text-white p-2 sm:p-4 md:p-8"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.95)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-4 md:gap-8">
              {/* Movie Poster - centered on mobile */}
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center md:block"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-xl w-[250px] md:w-[300px] h-auto"
                />
              </motion.div>

              {/* Movie Details */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4 px-2 md:px-0"
              >
                {logo && (
                  <Image
                    src={logo}
                    alt={movie.title}
                    width={400}
                    height={400}
                    className="w-full max-w-[300px] md:max-w-[400px] h-auto"
                  />
                )}

                <div className="flex items-center space-x-4 text-gray-300 overflow-x-auto pb-2">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    <span>{movie.release_date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>{movie.runtime} min</span>
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {movie.overview}
                </p>

                {/* Genres - improved wrapping */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {movie.genres?.map((genre, index) => (
                    <motion.span
                      key={genre.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.3,
                      }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "#2563eb",
                        boxShadow: "0 0 15px rgba(37, 99, 235, 0.5)",
                      }}
                      className="px-4 py-1.5 bg-primary rounded-full text-sm font-medium
                               transition-colors duration-300 cursor-pointer
                               border border-blue-500/30 backdrop-blur-sm
                               hover:text-white"
                    >
                      {genre.name}
                    </motion.span>
                  ))}
                </div>

                {/* Additional Details - updated grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-semibold text-primary">
                      {t("Original Language")}
                    </h3>
                    <p className="text-gray-300 mt-2">
                      {movie.original_language.toUpperCase()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-semibold text-primary">
                      {t("Status")}
                    </h3>
                    <p className="text-gray-300 mt-2">{movie.status}</p>
                  </div>
                  {movie.budget > 0 && (
                    <div className="p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-primary/50 transition-colors">
                      <h3 className="text-xl font-semibold text-primary">
                        {t("Budget")}
                      </h3>
                      <p className="text-gray-300 mt-2">
                        ${movie.budget.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
                {credits.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                      {t("Featured Cast")}
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                      {credits.slice(0, 8).map((credit) => (
                        <motion.div
                          key={credit.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.05 }}
                          className="p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-primary/50 transition-all group"
                        >
                          <div className="relative w-full aspect-[2/3] mb-2 overflow-hidden rounded-lg">
                            <Image
                              src={
                                credit.profile_path
                                  ? `https://image.tmdb.org/t/p/w500${credit.profile_path}`
                                  : "/Default.png"
                              }
                              alt={credit.name}
                              width={200}
                              height={300}
                              className="object-cover group-hover:scale-110 transition-transform duration-300 w-auto h-auto"
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="font-semibold text-white truncate">
                              {credit.name}
                            </h3>
                            <p className="text-sm text-gray-400 truncate">
                              {credit.character}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 px-2 sm:px-4 md:px-8 py-4 md:py-8">
            <div className="max-w-7xl mx-auto">
              <motion.div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-3xl font-bold text-white group">
                  <span className="text-primary relative">
                    {t("Recommended")}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>{" "}
                  {t("Movies")}
                </h2>
                <div className="hidden md:flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="swiper-prev-btn p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:shadow-lg hover:shadow-primary/20"
                  >
                    <FaChevronLeft size={20} className="text-primary" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="swiper-next-btn p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:shadow-lg hover:shadow-primary/20"
                  >
                    <FaChevronRight size={20} className="text-primary" />
                  </motion.button>
                </div>
              </motion.div>

              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                key={locale}
                navigation={{
                  prevEl: ".swiper-prev-btn",
                  nextEl: ".swiper-next-btn",
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: { slidesPerView: 1.5, spaceBetween: 10 },
                  480: { slidesPerView: 2, spaceBetween: 15 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
                className="w-full pb-4 md:pb-8"
              >
                {recommendations.map((movie, index) => (
                  <SwiperSlide key={movie.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative group rounded-xl overflow-hidden shadow-xl"
                    >
                      <Image
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/Default.png"
                        }
                        alt={movie.title}
                        width={300}
                        height={450}
                        className="w-auto h-auto object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-0 p-6 w-full">
                          <h3 className="text-white font-bold text-xl mb-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                            {movie.title}
                          </h3>
                          <div className="flex items-center gap-3 text-gray-300 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-500" />
                              <span className="font-semibold">
                                {movie.vote_average?.toFixed(1)}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full bg-primary/80 hover:bg-primary text-white transition-colors"
                                onClick={() => {
                                  router.push(`/movies/${movie.id}`);
                                }}
                              >
                                <FaPlay size={14} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="mt-8 md:mt-12 px-2 sm:px-4 md:px-8 py-4 md:py-8">
            <div className="max-w-7xl mx-auto">
              <motion.div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-3xl font-bold text-white group">
                  <span className="text-primary relative">
                    {t("Similar")}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>{" "}
                  {t("Movies")}
                </h2>
                <div className="hidden md:flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="swiper-prev-btn p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:shadow-lg hover:shadow-primary/20"
                  >
                    <FaChevronLeft size={20} className="text-primary" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="swiper-next-btn p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:shadow-lg hover:shadow-primary/20"
                  >
                    <FaChevronRight size={20} className="text-primary" />
                  </motion.button>
                </div>
              </motion.div>

              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                key={locale}
                navigation={{
                  prevEl: ".swiper-prev-btn",
                  nextEl: ".swiper-next-btn",
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: { slidesPerView: 1.5, spaceBetween: 10 },
                  480: { slidesPerView: 2, spaceBetween: 15 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
                className="w-full pb-4 md:pb-8"
              >
                {similar.map((movie, index) => (
                  <SwiperSlide key={movie.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative group rounded-xl overflow-hidden shadow-xl"
                    >
                      <Image
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/Default.png"
                        }
                        alt={movie.title}
                        width={300}
                        height={450}
                        className="w-auto h-auto object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-0 p-6 w-full">
                          <h3 className="text-white font-bold text-xl mb-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                            {movie.title}
                          </h3>
                          <div className="flex items-center gap-3 text-gray-300 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-500" />
                              <span className="font-semibold">
                                {movie.vote_average?.toFixed(1)}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full bg-primary/80 hover:bg-primary text-white transition-colors"
                                onClick={() => {
                                  router.push(`/movies/${movie.id}`);
                                }}
                              >
                                <FaPlay size={14} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </motion.div>
        <Footer bg="bg-gray-900" />
      </main>
    </>
  );
}

export default MoviePage;
