"use client";
import Navbar from "@/Components/Navbar";
import { useEffect, useState } from "react";
import {
  getMovieLogo,
  getMovies,
  getNowPlayingMovies,
  getGenres,
  getUpcomingMovies,
} from "@/Api/GET";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { FaPlay, FaStar, FaFire, FaFilm, FaTv } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { Movie, Genre } from "@/objects/movies.if";
import Image from "next/image";
import Loading from "@/app/loading";

import { Series } from "@/objects/series";
import { getSeries } from "@/Api/GetSeries";
import Link from "next/link";
import Footer from "@/Components/Footer";
import { useRouter } from "next/navigation";
import { RiMovie2Line } from "react-icons/ri";
import { useTranslations, useLocale } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [movieLogos, setMovieLogos] = useState<{
    [key: number]: string | null;
  }>({});

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          moviesData,
          nowPlayingData,
          genresData,
          upcomingData,
          seriesData,
        ] = await Promise.all([
          getMovies(locale, 1),
          getNowPlayingMovies(locale),
          getGenres(locale),
          getUpcomingMovies(locale),
          getSeries(locale, 1),
        ]);
        setMovies(moviesData.results);
        setNowPlayingMovies(nowPlayingData.results);
        setGenres(genresData.genres);
        setUpcomingMovies(upcomingData.results);
        setSeries(seriesData.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  useEffect(() => {
    movies.forEach(async (movie) => {
      const logo = await getMovieLogo(movie.id);
      setMovieLogos((prev) => ({ ...prev, [movie.id]: logo }));
    });
  }, [movies]);

  console.log(series);
  return (
    <main>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar isSeries={false} />
          <div className="h-[80vh] md:h-[90vh] w-full -mt-20">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full h-[80vh] md:h-[90vh] overflow-hidden"
              key={locale}
            >
              {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <div className="relative w-full h-full overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      style={{ y: backgroundY }}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        fill
                        priority
                      />

                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                    </motion.div>

                    {/* Content */}
                    <div
                      className="relative z-10 h-full flex items-center p-4 md:p-10"
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    >
                      <div className="container mx-auto px-2 md:px-4 space-y-4 md:space-y-6">
                        <motion.h1
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl md:text-5xl font-bold text-white max-w-2xl"
                        >
                          {movieLogos[movie.id] &&
                            movieLogos[movie.id] !== null && (
                              <Image
                                src={movieLogos[movie.id] as string}
                                alt={movie.title}
                                width={300}
                                height={300}
                              />
                            )}
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-sm md:text-base text-gray-200 max-w-xl"
                        >
                          {movie.overview.slice(0, 100)}...
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex gap-2 md:gap-4"
                        >
                          <button
                            className="flex items-center gap-1 md:gap-2 bg-red-500 text-white px-4 md:px-8 py-2 md:py-4 text-sm md:text-base rounded-full hover:bg-white hover:text-red-500 border-2 border-transparent hover:border-red-500 transition-all duration-300 transform hover:scale-105"
                            onClick={() => {
                              router.push(`/movies/${movie.id}`);
                            }}
                          >
                            <FaPlay /> {t("Watch Now")}
                          </button>
                          <button className="flex items-center gap-1 md:gap-2 bg-transparent text-white px-4 md:px-8 py-2 md:py-4 text-sm md:text-base rounded-full border-2 border-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                            <FaStar /> {Math.round(movie.vote_average)}{" "}
                            {t("Rating")}
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full bg-gradient-to-b from-black to-gray-900 min-h-screen flex items-center justify-center py-10 md:py-20">
            <div className="w-full ">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white text-2xl md:text-4xl mb-8 md:mb-16 text-center font-bold flex items-center justify-center gap-2 md:gap-4 px-4"
              >
                <FaFire className="text-red-500 animate-bounce" />
                {t("Our Today's Trending For You")}
                <FaFire className="text-red-500 animate-bounce" />
              </motion.h1>

              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}
                initialSlide={10}
                coverflowEffect={{
                  rotate: 30,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: true,
                }}
                navigation={true}
                modules={[EffectCoverflow, Navigation]}
                className="w-full py-20"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                  1280: {
                    slidesPerView: 5,
                  },
                }}
              >
                {nowPlayingMovies.slice(0, 20).map((movie) => (
                  <SwiperSlide
                    key={movie.id}
                    className="!w-[300px]"
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="relative w-[300px] h-[450px] rounded-xl overflow-hidden shadow-2xl"
                      onClick={() => router.push(`/movies/${movie.id}`)}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-110"
                        width={300}
                        height={450}
                        priority
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="w-full bg-gradient-to-b from-gray-900 to-black py-10 md:py-20">
            <div className="w-full">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white text-2xl md:text-4xl mb-8 md:mb-16 text-center font-bold flex items-center justify-center gap-2 md:gap-4"
              >
                <FaFilm className="text-red-500 animate-bounce" />
                {t("Our Genres")}
                <FaFilm className="text-red-500 animate-bounce" />
              </motion.h1>

              <div className="w-full h-20 overflow-hidden  rounded-xl  ">
                <div className="animate-scrolling-text whitespace-nowrap inline-flex gap-8 text-white text-2xl font-bold">
                  {genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="hover:text-red-500 transition-colors cursor-pointer hover:scale-110 transform duration-300"
                    >
                      {genre.name}
                    </span>
                  ))}

                  {genres.map((genre) => (
                    <span
                      key={`${genre.id}-duplicate`}
                      className="hover:text-red-500 transition-colors cursor-pointer hover:scale-110 transform duration-300"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-black min-h-screen flex flex-col items-center justify-center py-10 md:py-20">
            <div
              className="w-full max-w-[1800px] px-4 md:px-8 flex items-center justify-between mb-8 md:mb-16"
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-white text-2xl md:text-4xl text-left font-bold flex items-center gap-2 md:gap-3"
              >
                <RiMovie2Line className="text-red-500 text-base md:text-3xl" />
                {t("Our Upcoming Movies")}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Link href="/movies" className="group relative">
                  <p className="text-red-500 text-lg group-hover:text-white transition-colors duration-300 font-bold">
                    {t("See More")}
                  </p>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            </div>
            <div className="w-full">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={3000}
                loop={true}
                slidesPerView="auto"
                spaceBetween={16}
                className="w-full py-4"
                key={locale}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 32,
                  },
                }}
              >
                {upcomingMovies.map((movie) => (
                  <SwiperSlide
                    key={movie.id}
                    className="!w-[250px] group relative"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        width={250}
                        height={375}
                        priority
                        className="rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <p className="font-bold text-2xl">{movie.title}</p>
                          <p className="text-sm text-gray-300">
                            {new Date(movie.release_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="w-full bg-black min-h-screen flex flex-col items-center justify-center py-10 md:py-20">
              <div
                className="w-full max-w-[1800px] px-4 md:px-8 flex items-center justify-between mb-8 md:mb-16"
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-white text-2xl md:text-4xl text-left font-bold flex items-center gap-2 md:gap-3"
                >
                  <FaTv className="text-red-500 text-base md:text-3xl" />
                  {t("Our Top Rated Series")}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Link href="/series" className="group relative">
                    <p className="text-red-500 text-lg group-hover:text-white transition-colors duration-300 font-bold">
                      {t("See More")}
                    </p>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              </div>
              <div className="w-full">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 0, disableOnInteraction: false }}
                  speed={3000}
                  loop={true}
                  slidesPerView="auto"
                  spaceBetween={16}
                  className="w-full py-4"
                  key={locale}
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 8,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 16,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 32,
                    },
                  }}
                >
                  {series.map((movie) => (
                    <SwiperSlide
                      key={movie.id}
                      className="!w-[250px] group relative"
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <Image
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.name}
                          width={250}
                          height={375}
                          priority
                          className="rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <p className="font-bold text-2xl">{movie.name}</p>
                            <p className="text-sm text-gray-300">
                              {new Date(
                                movie.first_air_date
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <Footer bg="bg-black" />
        </>
      )}
    </main>
  );
}
