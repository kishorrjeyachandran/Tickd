import { motion } from "framer-motion";

const Screenshot = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto mb-20 relative"
    >
      {/* ✨ Gradient glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[70%] h-40 bg-gradient-to-r from-black/10 via-black/5 to-transparent blur-3xl rounded-full" />
      </div>

      {/* ✨ Blur halo */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="w-full h-full bg-white/40 blur-2xl rounded-2xl" />
      </div>

      {/* 📸 Screenshot card */}
      <motion.div
        whileHover={{ scale: 1.02, rotate: -1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative bg-[#f7f3ed] p-4 rounded-2xl shadow-lg border border-black/10"
      >
        <img
          src="/screenshot.png"
          alt="app preview"
          className="rounded-xl w-full"
        />

        {/* ✨ subtle overlay */}
        <div className="absolute inset-0 rounded-xl pointer-events-none bg-white/5" />
      </motion.div>
    </motion.div>
  );
};

export default Screenshot;