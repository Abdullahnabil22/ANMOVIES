"use client";
import { motion } from "framer-motion";
import { BiCameraMovie } from "react-icons/bi";

function Loading() {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-2 sm:gap-4">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <BiCameraMovie className="text-4xl sm:text-5xl md:text-6xl text-red-500" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="text-white text-base sm:text-lg md:text-xl font-semibold px-4 text-center"
      >
        Loading your feature presentation...
      </motion.p>
    </div>
  );
}

export default Loading;
