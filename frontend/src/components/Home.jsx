import { motion } from "framer-motion";
import Screenshot from "./Screenshot";
const Home = ({ goToApp, goToLogin }) => {
  return (
    <div className="min-h-screen bg-[#f5f1ea] px-6 py-10">

      {/* NAVBAR */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto flex justify-between items-center mb-20"
      >
        <div className="flex items-center gap-3">
          {/* 🔥 YOUR LOGO */}
          <img
            src="/logo.png"
            alt="logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-xl font-medium">Tickd</h1>
        </div>

        <button
          onClick={goToLogin}
          className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Login
        </button>
      </motion.div>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto text-center mb-20"
      >
        <h2 className="text-5xl font-semibold leading-tight mb-6">
          Organize your work.
          <br />
          Stay focused.
        </h2>

        <p className="text-gray-600 mb-8 text-lg">
          A minimal task manager designed to keep your workflow clean and distraction-free.
        </p>

        <button
          onClick={goToApp}
          className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:opacity-90"
        >
          Get Started
        </button>
      </motion.div>

      {/* SCREENSHOT */}
      <Screenshot />


      {/* FEATURES */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-sm"
      >
        <div>
          <h3 className="font-medium mb-2">Minimal Design</h3>
          <p className="text-gray-600">
            Clean interface that keeps you focused on what matters.
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Fast Workflow</h3>
          <p className="text-gray-600">
            Add, complete, and manage tasks instantly.
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Cloud Sync</h3>
          <p className="text-gray-600">
            Access your tasks anywhere with real-time sync.
          </p>
        </div>
      </motion.div>

      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs text-gray-400 mt-20"
      >
        Built with focus. Designed for clarity.
      </motion.div>

    </div>
  );
};

export default Home;