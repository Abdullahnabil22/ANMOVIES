"use client";

import { motion } from "framer-motion";
import { BiMoviePlay, BiError } from "react-icons/bi";
import { MdOutlineReplay } from "react-icons/md";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-zinc-900 p-8 rounded-lg shadow-2xl text-center"
      >
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <BiError className="mx-auto text-red-500 text-6xl mb-4" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="space-y-4"
        >
          <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <BiMoviePlay className="text-yellow-500" />
            Technical Difficulties
          </h1>

          <p className="text-zinc-400">
            We&apos;re experiencing some technical difficulties with this scene.
            Our film crew is working on it!
          </p>

          <button
            onClick={reset}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full
              flex items-center justify-center gap-2 mx-auto transition-colors duration-200"
          >
            <MdOutlineReplay />
            Retry Scene
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Error;
