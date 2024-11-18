"use client";

import { motion } from "framer-motion";
import { BiCameraMovie } from "react-icons/bi";
import { MdMovieFilter } from "react-icons/md";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <BiCameraMovie className="w-24 h-24 mx-auto mb-4 text-red-500" />
        <motion.h1
          className="text-6xl font-bold mb-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          4<span className="text-red-500">0</span>4
        </motion.h1>
        <h2 className="text-2xl font-semibold mb-4">Cut! Scene Not Found</h2>
        <p className="text-gray-400 mb-8">
          Looks like this scene didn't make the final cut
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors duration-300"
          >
            <MdMovieFilter className="mr-2" />
            Back to Main Scene
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative film strip */}
      <div className="absolute top-0 left-0 w-full h-8 bg-black flex">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-8 h-full border-r border-gray-800" />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-black flex">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-8 h-full border-r border-gray-800" />
        ))}
      </div>
    </div>
  );
}

export default NotFound;
