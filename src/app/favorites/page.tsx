"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { FaStar, FaHeart } from "react-icons/fa";
import { FaHeartCrack } from "react-icons/fa6";
import { FiPlay } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavBar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { favContext } from "@/Context/fav";
import { Movie } from "@/objects/movies.if";
import { Series } from "@/objects/series";

function Favorites() {
  const t = useTranslations("Favorites");
  const router = useRouter();
  const locale = useLocale();
  const { fav, setFav } = useContext(favContext) as {
    fav: (Movie | Series)[];
    setFav: React.Dispatch<React.SetStateAction<(Movie | Series)[]>>;
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

  const itemAnimation: Record<string, { opacity: number; y: number }> = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleRemoveFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFav((prevFav: (Movie | Series)[]) =>
      prevFav.filter((item) => item.id !== id)
    );
  };

  const handleItemClick = (type: string, id: number) => {
    router.push(`/${type}s/${id}`);
  };

  return (
    <main className="bg-black min-h-screen">
      <NavBar isSeries={false} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex items-center gap-3 mb-8">
          <FaHeart className="text-red-500 text-3xl" />
          <h1 className="text-4xl font-bold text-white">{t("Favorites")}</h1>
          <span className="text-gray-400 text-xl ml-2">({fav.length})</span>
        </div>

        {fav.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700"
          >
            <FaHeart className="text-7xl text-gray-500 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              {t("No Favorites Yet")}
            </h3>
            <p className="text-gray-400 text-center max-w-md">
              {t("Start adding movies and series to your favorites")}
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {fav.map((item) => (
              <motion.div
                key={item.id}
                variants={itemAnimation}
                onClick={() => handleItemClick(item.type, item.id)}
                className="group relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <Image
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "/Default.png"
                    }
                    alt={"name" in item ? item.name : item.title}
                    width={300}
                    height={450}
                    className="object-cover rounded-lg bg-black transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-100 transition-all duration-300 group-hover:opacity-100 group-hover:bg-gradient-to-t group-hover:from-red-900/90">
                    <h2 className="text-xl font-semibold text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                      {"name" in item ? item.name : item.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-2 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                      <FaStar className="text-yellow-400" />
                      <span className="text-white">
                        {item.vote_average?.toFixed(1)}
                      </span>
                      <div className="ml-auto flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/${item.type}s/${item.id}`);
                          }}
                          className="px-3 py-1.5 bg-red-500/20 border border-red-500/50 
                            text-red-500 rounded-full flex items-center gap-1.5 
                            hover:bg-red-500 hover:text-white 
                            transform transition-all duration-300 
                            hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                        >
                          <FiPlay className="text-lg" />
                        </button>
                        <button
                          onClick={(e) => handleRemoveFavorite(e, item.id)}
                          className="px-3 py-1.5 bg-red-500 border border-red-500/50 
                            text-white rounded-full flex items-center gap-1.5 
                            hover:bg-red-600
                            transform transition-all duration-300 
                            hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                        >
                          <FaHeartCrack className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      <Footer bg="bg-black" />
    </main>
  );
}

export default Favorites;
