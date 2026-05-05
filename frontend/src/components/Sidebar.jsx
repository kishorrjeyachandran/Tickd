import { Home, Calendar, Folder, Plus, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = ({
  focusInput,
  user,
  logout,
  goToLogin,
  setView,
  view,
  isOpen,
  setIsOpen,
}) => {
  const getClass = (name) =>
    `nav-item cursor-pointer ${
      view === name ? "text-black font-medium" : "text-gray-600"
    }`;

  return (
    <div
  className={`fixed md:static top-0 left-0 h-full z-50 w-64 
  bg-[#DDD6C0] transform transition-transform duration-300

  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0

  md:rounded-2xl rounded-r-2xl  // 🔥 KEY FIX

  flex flex-col justify-between px-6 py-6`}
>
      <div>
        {/* CLOSE BUTTON (mobile) */}
        <button
          className="md:hidden mb-4 text-sm"
          onClick={() => setIsOpen(false)}
        >
          ✕ Close
        </button>

        <motion.img
          src="/logo.png"
          alt="logo"
          className="w-8 h-8 object-contain mb-2"
          whileHover={{ scale: 1.15, rotate: -6 }}
        />

        <h2 className="text-xl font-medium mb-6">Tickd</h2>

        <button
          onClick={focusInput}
          className="flex items-center gap-2 text-sm bg-black text-white px-4 py-2 rounded-lg mb-8"
        >
          <Plus size={16} /> Add Task
        </button>

        <div className="space-y-5 text-sm">
          <div onClick={() => setView("today")} className={getClass("today")}>
            <Home size={18} /> Today
          </div>

          <div onClick={() => setView("upcoming")} className={getClass("upcoming")}>
            <Calendar size={18} /> Upcoming
          </div>

          <div onClick={() => setView("projects")} className={getClass("projects")}>
            <Folder size={18} /> Projects
          </div>

          <div onClick={() => setView("analysis")} className={getClass("analysis")}>
            <BarChart2 size={18} /> Analysis
          </div>
        </div>
      </div>

      {!user ? (
        <button
          onClick={goToLogin}
          className="text-sm border px-4 py-2 rounded-lg"
        >
          Login
        </button>
      ) : (
        <div className="flex items-center gap-3 mt-10 pt-6 border-t border-black/10">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
            {user.email[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm">{user.email}</p>
            <button onClick={logout} className="text-xs text-gray-500">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;