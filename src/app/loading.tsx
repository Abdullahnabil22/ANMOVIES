"use client";
import { motion } from "framer-motion";
import { BiCameraMovie } from "react-icons/bi";

function Loading() {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-4">
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
        <BiCameraMovie className="text-6xl text-red-500" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="text-white text-xl font-semibold"
      >
        Loading your feature presentation...
      </motion.p>
    </div>
  );
}

export default Loading;
