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
        <motion.img
  src="/logo.png"
  alt="logo"
  className="w-8 h-8 object-contain cursor-pointer"
  whileHover={{
    scale: 1.2,
    rotate: 8,
  }}
  transition={{ type: "spring", stiffness: 300 }}
  style={{
    filter: "drop-shadow(0 0 0px rgba(0,0,0,0))",
  }}
  onHoverStart={(e) => {
    e.target.style.filter = "drop-shadow(0 0 10px rgba(0,0,0,0.4))";
  }}
  onHoverEnd={(e) => {
    e.target.style.filter = "drop-shadow(0 0 0px rgba(0,0,0,0))";
  }}
/>


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
        transition={{ delay: 0.4 }}
        className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-sm mt-20"
      >
        <div>
          <h3 className="font-medium mb-2">Minimal Design</h3>
          <p className="text-gray-600">
            Clean interface that keeps you focused on what matters without unnecessary clutter.
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Fast Workflow</h3>
          <p className="text-gray-600">
            Add, complete, and manage tasks instantly with keyboard-friendly interactions.
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Cloud Sync</h3>
          <p className="text-gray-600">
            Your tasks are securely stored and synced in real-time across devices.
          </p>
        </div>
      </motion.div>

      {/* WHY TICKD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-3xl mx-auto text-center mt-24"
      >
        <h3 className="text-2xl font-medium mb-4">
          Why Tickd?
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Most task managers are overloaded with features. Tickd focuses on simplicity,
          speed, and clarity — helping you stay productive without distractions.
        </p>
      </motion.div>

      {/* ABOUT DEVELOPER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-4xl mx-auto mt-24 bg-[#f7f3ed] rounded-2xl p-10"
      >
        <h3 className="text-2xl font-medium mb-4">
          About the Developer
        </h3>

        <p className="text-gray-600 leading-relaxed mb-4">
          Hi, I'm <span className="font-medium text-black">Kishor</span>, a full-stack developer
          passionate about building clean, user-focused applications. I enjoy transforming ideas
          into real products that people can actually use.
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">
          Tickd was built as a way to explore minimal design principles while integrating
          modern technologies like React and Supabase for real-time functionality.
        </p>

        <p className="text-gray-600 leading-relaxed">
          I focus on writing clean code, building intuitive UI, and continuously improving
          through real-world projects.
        </p>
      </motion.div>

      {/* FINAL CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-20"
      >
        <button
          onClick={goToApp}
          className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:opacity-90"
        >
          Start Organizing Now
        </button>
      </motion.div>

      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center text-xs text-gray-400 mt-20"
      >
        Built with focus. Designed for clarity.
      </motion.div>

    </div>
  );
};

export default Home;